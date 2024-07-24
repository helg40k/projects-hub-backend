import getTeams from './getTeams.js';
import helpers from '../helpers/index.js';

const getAllTeams = () => {
  return helpers.fetchAllData(getTeams);
};

export default getAllTeams;
