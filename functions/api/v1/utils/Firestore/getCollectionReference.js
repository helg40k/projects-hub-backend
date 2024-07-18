import getFirestore from './getFirestore';

/**
 * this method returns a reference to a defined firebase table (collection)
 * @param {string} collectionName - string that represents database collection name
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {object} - collection reference object if it exists
 */
const getCollectionReference = (collectionName, customRef = null) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();
  return baseRefComputed.collection(collectionName);
};

export default getCollectionReference;
