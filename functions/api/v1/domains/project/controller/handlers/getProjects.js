import Service from '../../service/index.js';

const getProjects = async (request, response, next) => {
  console.log('getProjects is started');
  const responsePayload = {
    data: 'success'
  };

  try {
    await Service.getProjects();
    return response.status(200).send(responsePayload);
  } catch (e) {
    next(e);
  }
};

export default getProjects;
