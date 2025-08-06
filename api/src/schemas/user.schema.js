const Joi = require('joi');

// Schema for incoming create‑user payload (pre‑enrichment)
const createUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  zip: Joi.string()
    .pattern(/^\d{5}(?:-\d{4})?$/)
    .required()
    .messages({ 'string.pattern.base': 'zip must be a valid US ZIP.' }),
});

// Schema for user update payload
const updateUserSchema = Joi.object({
  name: Joi.string().min(1),
  zip: Joi.string().pattern(/^\d{5}(?:-\d{4})?$/),
}).min(1);

// Schema representing a complete, enriched user object stored in Firebase
const userSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().min(1).required(),
  zipCode: Joi.string()
    .pattern(/^\d{5}(?:-\d{4})?$/)
    .required()
    .messages({ 'string.pattern.base': 'zipCode must be a valid US ZIP.' }),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  timezone: Joi.number().integer().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  userSchema,
};