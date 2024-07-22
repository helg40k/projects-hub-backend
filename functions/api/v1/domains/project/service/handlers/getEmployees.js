import Joi from 'joi';
import validate from '../../../../utils/validate/index.js';
import functions from 'firebase-functions';
import fetch from 'node-fetch';
import helpers from '../helpers/index.js';

const getEmployees = async (options = {}) => {
  const validatedParams = validate(getEmployeesSchema, options);

  const firebaseConfig = functions.config();
  const response = await fetch(
    `${firebaseConfig.peopleforce.url}/employees?page=${validatedParams.page}`,
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

const getEmployeesSchema = Joi.object({
  page: Joi.number().default(1).min(1),
  status: Joi.string().default('all').valid('all', 'active', 'inactive', 'employed', 'terminated', 'hired', 'probation'),
});

export default getEmployees;
