import functions from 'firebase-functions';
import admin from 'firebase-admin';

// extracting of firebase config variables (environment variables)
const firebaseConfig = functions.config();

// importing fo the service account (private firebase database keys)
const serviceAccount = require(`../configs/${firebaseConfig.fb.service_account_config_name}`);

class FirebaseApp {
  constructor() {
    // initialization of the firebase-app instance (firebase instance)
    this.defaultProdApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: firebaseConfig.fb.database_url
      // storageBucket: firebaseConfig.storage.storage_bucket
    });
  }

  /**
   * this method will return the instance of initialized fb app
   * @return {object} - firebase instance
   */
  getFirebaseAppInstance() {
    return this.defaultProdApp || null;
  }
}

const defaultProdApp = new FirebaseApp().getFirebaseAppInstance();

export default defaultProdApp;
