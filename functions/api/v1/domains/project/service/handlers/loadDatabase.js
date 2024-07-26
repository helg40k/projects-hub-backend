import { COLLECTIONS } from '../../../../constants/collections.js';
import helpers from '../helpers/index.js';
import getAllProjects from './getAllProjects.js';
import getAllEmployees from './getAllEmployees.js';
import getAllTeams from "./getAllTeams.js";

const loadDatabase = async () => {
  console.log('loadProjects ===');
  const projects = (await getAllProjects()).data;
  const savedProjects = [];
  for (const project of projects) {
    const fields = {
      _idNative: 'id',
      name: 'name',
      teamId: null,
      concurrentTeams: null
    };
    const result = await helpers.saveData(COLLECTIONS.PROJECTS, project, fields);
    if (result) {
      savedProjects.push(result);
    }
  }

  console.log('loadEmployees ===');
  const employees = (await getAllEmployees()).data;
  const savedEmployees = [];
  for (const employee of employees) {
    const fields = {
      _idNative: 'id',
      fullName: 'full_name',
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      avatarUrl: 'avatar_url'
    };
    const result = await helpers.saveData(COLLECTIONS.EMPLOYEES, employee, fields);
    if (result) {
      savedEmployees.push(result);
    }
  }

  console.log('loadTeams ===');
  const teams = (await getAllTeams()).data;
  const savedTeams = [];
  for (const team of teams) {
    const fields = {
      _idNative: 'id',
      name: 'name',
      description: 'description',
      teamLeadIdNative: 'team_lead.id',
      teamLeadId: null,
      teamMembers: 'team_members.user.id'
    };
    const result = await helpers.saveData(COLLECTIONS.TEAMS, team, fields);
    if (result) {
      savedTeams.push(result);
    }
  }

  await helpers.createRelations(savedProjects, savedEmployees, savedTeams);
};

export default loadDatabase;
