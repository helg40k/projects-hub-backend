import Joi from "joi";
import { COLLECTIONS } from '../../../../constants/collections.js';
import validate from '../../../../utils/validate/index.js';
import Firestore from "../../../../utils/Firestore/index.js";

const createRelations = async (projects, employees, teams) => {
  validate(createRelationsSchema, { projects, employees, teams });

  console.log(`Projects: ${projects.length}`);
  console.log(`Employees: ${employees.length}`);
  console.log(`Teams: ${teams.length}`);

  await createRelationsBetweenProjectsAndTeams(projects, teams);
  await createRelationsBetweenTeamsAndEmployees(teams, employees);
};

const createRelationsBetweenProjectsAndTeams = async (projects, teams) => {
  await Promise.allSettled(projects
    .filter((project) => project.name && !project.teamId)
    .map((project) => {
      const name = project.name;
      const matchedTeams = teams.filter((team) => team.name?.toLowerCase().includes(name.toLowerCase()));
      console.log(`Found ${matchedTeams.length} teams for project '${name}'`);
      if (matchedTeams.length === 1) {
        project.teamId = matchedTeams[0]._id;
        project.concurrentTeams = null;
      } else if (matchedTeams.length > 1) {
        project.concurrentTeams = matchedTeams.map(team => team._id);
      } else {
        return null;
      }
      return Firestore.updateDocumentById(COLLECTIONS.PROJECTS, project, project._id);
    })
  );
};

const createRelationsBetweenTeamsAndEmployees = async (teams, employees) => {
  const idsCache = {};
  employees.forEach((employee) => idsCache[employee._idNative] = employee._id);

  await Promise.allSettled(teams
    .filter((team) => team.teamLeadIdNative
      || ( typeof team.teamMembers === 'object' && !Array.isArray(team.teamMembers) && team.teamMembers !== null))
    .map((team) => {
      let toUpdate = false;

      const teamLead = idsCache[team.teamLeadIdNative];
      if (teamLead) {
        team.teamLeadId = teamLead;
        toUpdate = true;
      }

      const teamMembers = team.teamMembers;
      for (const teamMember in teamMembers) {
        const employee = idsCache[teamMember];
        if (employee) {
          teamMembers[teamMember] = employee;
          toUpdate = true;
        }
      }

      if (toUpdate) {
        return Firestore.updateDocumentById(COLLECTIONS.TEAMS, team, team._id);
      }

      return null;
    })
  );
};

const createRelationsSchema = Joi.object({
  projects: Joi.array().required(),
  employees: Joi.array().required(),
  teams: Joi.array().required()
});

export default createRelations;
