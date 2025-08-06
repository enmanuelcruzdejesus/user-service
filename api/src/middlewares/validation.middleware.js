module.exports = function validateSchema(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // remove unknown keys to keep payload clean
    });

    if (error) {
      error.status = 400; // so non‑Joi consumers know it’s a bad request
      return next(error); // errorHandler will format JSON response
    }

    req.body = value; // attach sanitized & validated data
    next();
  };
};