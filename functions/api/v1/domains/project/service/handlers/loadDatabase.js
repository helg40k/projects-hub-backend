import admin from 'firebase-admin';
import moment from 'moment';
import { COLLECTIONS } from '../../../../constants/collections.js';
import helpers from '../helpers/index.js';
import getAllProjects from './getAllProjects.js';
import getAllEmployees from './getAllEmployees.js';

const loadDatabase = async () => {
  // admin.firestore.Timestamp.now().seconds
  // admin.firestore.FieldValue.serverTimestamp()

  console.log('loadProjects ===');
  const projects = (await getAllProjects()).data;

  for (const project of projects) {
    const payload = {
      nativeId: project.id,
      name: project.name,
      _createdAt: admin.firestore.Timestamp.fromDate(moment(project.created_at).toDate())
    };
    await helpers.saveData(COLLECTIONS.PROJECTS, payload);
  }

  console.log('loadEmployees ===');
  const employees = (await getAllEmployees()).data;

  for (const employee of employees) {
    const payload = {
      nativeId: employee.id,
      fullName: employee.full_name,
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      avatarUrl: employee.avatar_url,
      _createdAt: admin.firestore.Timestamp.fromDate(moment(employee.created_at).toDate())
    };
    await helpers.saveData(COLLECTIONS.EMPLOYEES, payload);
  }
};

export default loadDatabase;
