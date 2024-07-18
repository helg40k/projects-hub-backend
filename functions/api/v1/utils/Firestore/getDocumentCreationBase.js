import admin from 'firebase-admin';

/* A function that returns an object with the following properties:
	_id: the id of the document
	_createdAt: the time the document was created
	_updatedAt: the time the document was updated
	_isUpdated: a boolean that indicates if the document has been updated */
const getDocumentCreationBase = (_id) => {
  return {
    _id,
    _createdAt: admin.firestore.FieldValue.serverTimestamp(),
    _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    _updatedBy: null,
    _isUpdated: false
  };
};

export default getDocumentCreationBase;
