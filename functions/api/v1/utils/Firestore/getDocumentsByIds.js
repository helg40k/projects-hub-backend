import getDocumentById from './getDocumentById.js';

/**
 * Given a collection reference and a document ids, return data from database
 * @param {string} collectionName - Path to documents in firestore.
 * @param {string[]} documentsIds - document ids that should be fetched.
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise} An array of data from firestore.
 */
const getDocumentsByIds = async (
  collectionName,
  documentsIds,
  customRef = null
) => {
  try {
    const responseData = [];
    const fetchPromises = documentsIds.map((documentId) =>
      getDocumentById(collectionName, documentId, customRef)
    );

    const snapshots = await Promise.allSettled(fetchPromises);
    snapshots.forEach(({ value, reason }) => {
      if (value) responseData.push(value);
      else throw new Error(reason);
    });

    return responseData;
  } catch (error) {
    console.error('Error in getDocumentsByIds', error);
    throw error;
  }
};

export default getDocumentsByIds;
