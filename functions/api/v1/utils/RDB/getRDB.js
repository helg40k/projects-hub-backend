import foiBackendAppProd from '../../apps/backend-app';

/**
 * returns Firebase RDB object; otherwise throws an error
 * if the Firebase RDB is not initialized on the moment of the call
 * @return {object} the Firebase RDB object
 */
const getRDB = () => {
  const rdb = foiBackendAppProd.database();
  if (!rdb) {
    throw new Error('Real time database is not initialized, RDB is not defined');
  }
  return rdb;
};

export default getRDB;
