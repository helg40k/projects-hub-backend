import Joi from 'joi';

const getProjects = Joi.object({
  body: Joi.object()
});

export default {
  getProjects
};
