import Joi from "joi";
import admin from 'firebase-admin';
import moment from 'moment';
import validate from '../../../../utils/validate/index.js';
import Firestore from "../../../../utils/Firestore/index.js";
import getFieldContent from "./getFieldContent.js";

const saveData = (collectionName, source, fields) => {
  validate(saveDataSchema, { source, fields });
  // admin.firestore.Timestamp.now().seconds
  // admin.firestore.FieldValue.serverTimestamp()
  // console.log(`updated at: ${admin.firestore.Timestamp.fromDate(moment(project.updated_at).toDate())}`);

  const payload = {};
  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    payload[key] = getFieldContent(value, source);
  });
  if (source.created_at) {
    try {
      payload._createdAt = admin.firestore.Timestamp.fromDate(moment(source.created_at).toDate());
    } catch (e) {
      console.error(`Cannot convert ${collectionName} 'created_at' field from 'source.created_at'`, e);
    }
  }

  return Firestore.createDocument(collectionName, payload);
};

const saveDataSchema = Joi.object({
  source: Joi.object().required(),
  fields: Joi.object().required().pattern(Joi.string().required(), Joi.string().allow(null))
});

export default saveData;
