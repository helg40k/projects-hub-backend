import getProjects from './getProjects.js';
import helpers from '../helpers/index.js';

const getAllProjects = () => {
  return helpers.fetchAllData(getProjects);
};

export default getAllProjects;
