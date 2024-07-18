import admin from 'firebase-admin';
import getFirestore from './getFirestore';

const UPDATED_BY_CONSTANT = 'ON_SK_BACKEND';

/**
 * this method will update document in the firebase database by provided id
 * @param {string} collectionName - string that represents database collection name
 * @param {object} data - represents object with document data that will be merged with actual document (rewritten)
 * @param {string} id - represents document id
 * @param {object} customRef - represents a custom reference to the collection (could be used for the subcollections)
 * @return {Promise<object>} - firebase updating operation object
 */
const updateDocumentById = async (
  collectionName,
  data,
  id,
  customRef = null
) => {
  /* A way to assign a default value to a variable if it is not defined. */
  const baseRefComputed = customRef || getFirestore();
  const payload = {
    _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    _isUpdated: true,
    ...data
  };
  if (!data._updatedBy) {
    payload._updatedBy = UPDATED_BY_CONSTANT;
  }

  // "received RST_STREAM" error workaround
  // https://stackoverflow.com/questions/69590889/js-sdk-v2-0-16-error-13-internal-received-rst-stream-with-code-0
  let count = 0;
  while (count < 2) {
    try {
      count++;
      return await baseRefComputed
        .collection(collectionName)
        .doc(id)
        .update(payload);
    } catch (error) {
      console.error(
        `Error during updating operation for '${collectionName}' ID: ${id}`,
        error
      );
      if (!error.message.includes('RST_STREAM')) {
        throw error; // do not retry the operation if it's not RST_STREAM error
      }
    }
  }
};

export default updateDocumentById;
