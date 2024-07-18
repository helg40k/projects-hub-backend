/* eslint no-unused-vars: ["error", { "args": "none" }] */
import express from 'express';
import cors from 'cors';
import Project from '../domains/project/index.js';
import corsOptions from '../configs/corsOptions.js';
const projects = express();

projects.use(cors(corsOptions));

projects.use(express.json());

projects.use('/', Project.ProjectRoute);

projects.use((error, request, response, next) => {
  console.error(error);

  const code = error.code || 500;
  const message = !error.response
    ? 'Something went wrong! Check error and try again.'
    : error.message;

  let errorMessage;
  if (error.response?.body?.errors && 0 < error.response.body.errors.length) {
    errorMessage = error.response.body.errors
      .map((item) => item.message)
      .reduce((message1, message2) => `${message1}. ${message2}`);
  } else {
    errorMessage = error.message;
  }
  console.log('Error:', errorMessage);
  response
    .status(500)
    .send({
      statusCode: code,
      message,
      error: errorMessage
    })
    .end();
});

export default projects;
