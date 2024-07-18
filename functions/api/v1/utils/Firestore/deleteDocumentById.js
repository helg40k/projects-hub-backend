import getFirestore from './getFirestore';

/**
 * this method will delete document by provided id and collectionPath
 * @param {string} collectionPath - string that represents database collection path
 * @param {string} id - represents document id
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<string>} - deleted document id
 */
const deleteDocumentById = async (collectionPath, id, customRef = null) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();
  await baseRefComputed.collection(collectionPath).doc(id).delete();
  return id;
};

export default deleteDocumentById;
