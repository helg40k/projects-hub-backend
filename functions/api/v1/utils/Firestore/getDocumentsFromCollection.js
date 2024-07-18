import getFirestore from './getFirestore';

/**
 * this method will fetch all document data from a firebase table (collection)
 * @param {string} collectionName - string that represents database collection name
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<array<object>>} - document data if fetch was successful
 */
const getDocumentsFromCollection = async (collectionName, customRef = null) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();

  const snapshot = await baseRefComputed.collection(collectionName).get();
  return !snapshot.empty ? snapshot.docs.map((doc) => doc.data()) : [];
};

export default getDocumentsFromCollection;
