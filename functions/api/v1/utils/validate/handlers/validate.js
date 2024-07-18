/**
 * Validates an entering data object using Joi validation library schema
 * @param {Joi.ObjectSchema<any>} schema - the schema object with Joi validation rules
 * @param {object} object - the tested data object
 * @param {boolean} allowUnknown - if true (default), it allows unknown keys that will be ignored
 * @mixin Joi
 * @return {object} validated value corresponded to the tested data object
 */
const validate = (schema, object, allowUnknown = true) => {
  if (!schema) {
    throw Error('Testing schema may not be empty!');
  }
  if (!object) {
    throw Error('Tested object may not be empty!');
  }

  // Joi validation options
  const validationOptions = {
    abortEarly: true, // abort after the last validation error
    allowUnknown, // allow unknown keys that will be ignored
    stripUnknown: false // remove unknown keys from the validated data
  };

  // return the validation middleware
  const validationResult = schema.validate(object, validationOptions);
  if (validationResult?.error) {
    throw Error(validationResult.error);
  }
  if (!validationResult?.value) {
    throw Error('Empty validating results!'); // Unlikely!
  }
  return validationResult.value;
};

export default validate;
