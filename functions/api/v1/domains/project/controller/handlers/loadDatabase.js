import Service from '../../service/index.js';

const loadDatabase = async (request, response, next) => {
  console.log('loadDatabase is started');
  const responsePayload = {
    data: 'success'
  };

  try {
    await Service.loadDatabase();
    return response.status(200).send(responsePayload);
  } catch (e) {
    next(e);
  }
};

export default loadDatabase;
