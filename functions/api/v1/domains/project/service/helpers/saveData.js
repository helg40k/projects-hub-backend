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

  const payload = {};
  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    payload[key] = getFieldContent(value, source);
  });
  if (source.created_at) {
    payload._createdAt = convertDate(collectionName, source.created_at, source.id);
  }
  if (source.updated_at) {
    payload._updatedAtNative = convertDate(collectionName, source.updated_at, source.id);
  }

  return Firestore.createDocument(collectionName, payload, null, true);
};

const convertDate = (collectionName, date, id) => {
  try {
    return admin.firestore.Timestamp.fromDate(moment(date).toDate());
  } catch (e) {
    console.error(`Cannot convert date for ${collectionName} (ID: ${id}) field from '${date}'`, e);
    return null;
  }
};

const saveDataSchema = Joi.object({
  source: Joi.object().required(),
  fields: Joi.object().required().pattern(Joi.string().required(), Joi.string().allow(null))
});

export default saveData;
