const getContent = async (response) => {
  if (response.ok) {
    return await response.json();
  }

  const errorCode = response.status;

  const content = await response.json();
  const errors = content.errors || [];
  const errorDescription = errors
    .map((error) => error.message)
    .reduce((error1, error2) => error2 ? `${error1}; ${error2}` : error1, '');

  throw new Error(`PeopleForce has returned error(s) with HTTP code ${errorCode}: ${errorDescription}`);
};

export default getContent;
