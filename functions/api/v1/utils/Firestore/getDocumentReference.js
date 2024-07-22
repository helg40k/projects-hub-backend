import getFirestore from './getFirestore.js';

/**
 * this method returns a reference to a document in a firebase table (collection)
 * @param {string} collectionName - string that represents database collection name
 * @param {string} id - that represents document id
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<object>} - document reference object if it exists
 */
const getDocumentReference = (collectionName, id, customRef = null) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();
  return baseRefComputed.collection(collectionName).doc(id);
};

export default getDocumentReference;
