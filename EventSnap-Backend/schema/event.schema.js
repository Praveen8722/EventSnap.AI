const Joi = require('joi');

exports.eventSchema = Joi.object({
  eventName: Joi.string().required(),
  place: Joi.string().required(),
  customer: Joi.string().required(),
  imageUrls: Joi.array().items(Joi.string().uri()) // optional direct URLs
});
