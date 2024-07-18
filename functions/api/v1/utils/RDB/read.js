import getRDB from './getRDB';

/**
 * this function will return an object from a DB path
 * @param {string} path - string that represents database collection path
 * @param {function} callback - callback function to process fetched snapshot (snapshot.val() is required inside callback)
 * @return {Promise<object> | Promise<null>} - firebase RDB data object or nothing (in case with callback)
 */
const read = async (path, callback) => {
  const ref = getRDB().ref(path);

  if (callback) {
    ref.once('value', (snapshot) => callback(snapshot));
  } else {
    const snapshot = await ref.once('value');
    return snapshot ? snapshot.val() : null;
  }
};

export default read;
