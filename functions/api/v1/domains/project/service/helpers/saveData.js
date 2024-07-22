import admin from 'firebase-admin';
import moment from 'moment';
import Firestore from "../../../../utils/Firestore/index.js";

const saveData = (collectionName, payload) => {
  // console.log(`updated at: ${admin.firestore.Timestamp.fromDate(moment(project.updated_at).toDate())}`);
  return Firestore.createDocument(collectionName, payload);
};

export default saveData;
