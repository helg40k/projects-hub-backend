import getFirestore from './getFirestore.js';

/**
 * this method will fetch document data from firebase by provided id
 * @param {string} collectionName - string that represents database collection name
 * @param {string} id - that represents document id
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<object> | Promise<null>} - document data if fetch was successful or null if something went wrong
 */
const getDocumentById = async (collectionName, id, customRef = null) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();

  const queryDocument = await baseRefComputed
    .collection(collectionName)
    .doc(id)
    .get();
  const queryDocumentData = queryDocument.exists && queryDocument.data();

  return queryDocumentData || null;
};

export default getDocumentById;
