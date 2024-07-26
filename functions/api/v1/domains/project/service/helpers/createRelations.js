import Joi from "joi";
import { COLLECTIONS } from '../../../../constants/collections.js';
import validate from '../../../../utils/validate/index.js';
import Firestore from "../../../../utils/Firestore/index.js";

const createRelations = async (projects, employees, teams) => {
  validate(createRelationsSchema, { projects, employees, teams });

  console.log(`Projects: ${projects.length}`);
  console.log(`Employees: ${employees.length}`);
  console.log(`Teams: ${teams.length}`);

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

const createRelationsSchema = Joi.object({
  projects: Joi.array().required(),
  employees: Joi.array().required(),
  teams: Joi.array().required()
});

export default createRelations;
