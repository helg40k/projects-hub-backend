import getFirestore from './getFirestore';

/**
 * Given a collection reference and a where and a orderBy clauses array, return data from database
 * @param {object} collectionName - The Firestore collection name.
 * @param {array} where - A list of where clauses to apply to the query.
 * @param {array} orderBy - A list of orderBy clauses to apply to the query, first element is field path, second element is 'asc' or 'desc' in array.
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<array<object>>} An array of data from database according to query.
 */
const getDocumentsWithComplexClauses = async (
  collectionName,
  where,
  orderBy,
  customRef = null
) => {
  try {
    /* A way to assign a default value to a variable if it is not defined. */
    const baseRefComputed = customRef || getFirestore();

    let refWithClauses = baseRefComputed.collection(collectionName);

    where.forEach(([fieldPath, operation, value]) => {
      refWithClauses = refWithClauses.where(fieldPath, operation, value);
    });

    orderBy.forEach(([fieldPath, filter = 'asc']) => {
      refWithClauses = refWithClauses.orderBy(fieldPath, filter);
    });

    const snapshot = await refWithClauses.get();
    return snapshot.empty ? [] : snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error('Error in getDataWithComplexClauses function');
  }
};

export default getDocumentsWithComplexClauses;
