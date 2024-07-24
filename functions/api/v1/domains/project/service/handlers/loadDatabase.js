import { COLLECTIONS } from '../../../../constants/collections.js';
import helpers from '../helpers/index.js';
import getAllProjects from './getAllProjects.js';
import getAllEmployees from './getAllEmployees.js';
import getAllTeams from "./getAllTeams.js";

const loadDatabase = async () => {
  console.log('loadProjects ===');
  const projects = (await getAllProjects()).data;
  for (const project of projects) {
    const fields = {
      nativeId: 'id',
      name: 'name'
    };
    await helpers.saveData(COLLECTIONS.PROJECTS, project, fields);
  }

  console.log('loadEmployees ===');
  const employees = (await getAllEmployees()).data;
  for (const employee of employees) {
    const fields = {
      nativeId: 'id',
      fullName: 'full_name',
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      avatarUrl: 'avatar_url'
    };
    await helpers.saveData(COLLECTIONS.EMPLOYEES, employee, fields);
  }

  console.log('loadTeams ===');
  const teams = (await getAllTeams()).data;
  for (const team of teams) {
    const fields = {
      nativeId: 'id',
      name: 'name',
      description: 'description',
      teamLeadId: 'team_lead.id',
      teamMembers: 'team_members.user.id'
    };
    await helpers.saveData(COLLECTIONS.TEAMS, team, fields);
  }
};

export default loadDatabase;
