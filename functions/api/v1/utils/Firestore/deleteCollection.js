import getFirestore from './getFirestore.js';

const deleteQueryBatch = async (db, query, resolve) => {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
};

const deleteCollection = async (collectionRef, batchSize = 15) => {
  const query = collectionRef.orderBy('_id').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(getFirestore(), query, resolve).catch(reject);
  });
};

export default deleteCollection;
