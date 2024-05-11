const Joi = require('joi');

module.exports.listingSchemaValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    category: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required()
});

module.exports.reviewSchemaValidator = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
})
