import Joi from 'joi';
import validate from '../../../../utils/validate/index.js';

const fetchAllData = async (fetchDataFunction, fetchDataOptions) => {
  validate(fetchAllDataSchema, {
    fetchDataFunction,
    fetchDataOptions
  });
  const functionName = fetchDataFunction.name;

  const results = {
    data: [],
    error: null
  };

  try {
    const firstCall = await fetchDataFunction(fetchDataOptions);
    if (firstCall?.data) {
      results.data = results.data.concat(firstCall?.data);
      console.log(`The first call of "${functionName}" function, fetched ${firstCall.data.length} items`);

      const pages = firstCall?.metadata?.pagination?.pages;
      if (pages && pages > 1) {
        for (let i = 2; i < pages + 1; i++) {
          const iteratedDataOptions = fetchDataOptions || {};
          iteratedDataOptions.page = i;
          const iteratedCall = await fetchDataFunction(iteratedDataOptions);
          if (iteratedCall?.data) {
            results.data = results.data.concat(iteratedCall?.data);
            console.log(`The call #${i} of "${functionName}" function, fetched ${iteratedCall.data.length} items`);
          } else {
            console.warn(`The call #${i} of "${functionName}" function, nothing was fetched!`);
          }
        }
      }
    } else {
      console.warn(`The first call of "${functionName}" function, nothing was fetched!`);
    }
  } catch (error) {
    console.error(`Unpredicted error during ${functionName} calling!`, error);
    results.error = error;
  }

  return results;
};

const fetchAllDataSchema = Joi.object({
  fetchDataFunction: Joi.function().required(),
  fetchDataOptions: Joi.object()
});

export default fetchAllData;
