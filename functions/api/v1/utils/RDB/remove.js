import getRDB from './getRDB';

/**
 * this function will delete an object on a DB path
 * @param {string} path - string that represents database collection path
 */
const remove = async (path) => {
  await getRDB().ref(path).remove();
};

export default remove;
