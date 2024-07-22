import Joi from 'joi';
import validate from '../../../../utils/validate/index.js';
import functions from 'firebase-functions';
import fetch from 'node-fetch';
import helpers from '../helpers/index.js';

const getProjects = async (options = {}) => {
  const validatedParams = validate(getProjectsSchema, options);

  const firebaseConfig = functions.config();
  const response = await fetch(
    `${firebaseConfig.peopleforce.url}/time/projects?page=${validatedParams.page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': firebaseConfig.peopleforce.api_key
      }
    }
  );

  return await helpers.getContent(response);
};

const getProjectsSchema = Joi.object({
  page: Joi.number().default(1).min(1)
});

export default getProjects;
