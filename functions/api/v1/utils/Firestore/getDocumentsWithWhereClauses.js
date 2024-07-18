import getFirestore from './getFirestore';

/**
 * Given a collection reference and a where clauses array, return data from database
 * @param {object} collectionName - The Firestore collection name.
 * @param {array} where - A list of where clauses to apply to the query.
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<array<object>>} An array of data from database according to query.
 */
const getDocumentsWithWhereClauses = async (
  collectionName,
  where,
  customRef = null
) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();

  let refWithClauses = baseRefComputed.collection(collectionName);

  where.forEach(([fieldPath, operation, value]) => {
    refWithClauses = refWithClauses.where(fieldPath, operation, value);
  });

  const snapshot = await refWithClauses.get();
  return !snapshot.empty ? snapshot.docs.map((doc) => doc.data()) : [];
};

export default getDocumentsWithWhereClauses;
