import getEmployees from './getEmployees.js';
import helpers from '../helpers/index.js';

const getAllEmployees = () => {
  return helpers.fetchAllData(getEmployees);
};

export default getAllEmployees;
