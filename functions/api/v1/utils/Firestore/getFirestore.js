import foiBackendAppProd from '../../apps/backend-app';

/**
 * returns firestore object; otherwise throws an error
 * if the firestore is not initialized on the moment of the call
 * @return {object} the firestore object
 */
const getFirestore = () => {
  const firestore = foiBackendAppProd.firestore();
  if (!firestore) {
    throw new Error('Firebase is not initialized, firestore is not defined');
  }
  return firestore;
};

export default getFirestore;
