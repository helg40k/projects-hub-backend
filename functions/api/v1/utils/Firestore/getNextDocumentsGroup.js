import getFirestore from './getFirestore';

/**
 * This method will return documents from a collection divided by groups
 * @param {string} collectionName - string that represents database collection path
 * @param {string} previousDocumentId - the last ID of previous read document group (optional)
 * @param {number} limit - limit of the fetched documents for the same session
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<array<object>>} An array of data from database according to query.
 */
const getNextDocumentsGroup = async (
  collectionName,
  previousDocumentId,
  limit,
  customRef
) => {
  try {
    /* A way to assign a default value to a variable if it is not defined. */
    const baseRefComputed = customRef || getFirestore();

    const verifiedLimit = limit || 500;
    let query = baseRefComputed.collection(collectionName).orderBy('_id');

    if (previousDocumentId) {
      query = query.where('_id', '>', previousDocumentId);
    }

    const snapshot = await query.limit(verifiedLimit).get();

    return !snapshot.empty ? snapshot.docs.map((doc) => doc.data()) : [];
  } catch (error) {
    throw new Error('Error in getNextDocumentsGroup function');
  }
};

export default getNextDocumentsGroup;
