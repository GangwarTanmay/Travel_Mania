//middleware to validate reviews
const ExpressError = require('../utils/ExpressError.js');
const { listingSchemaValidator, reviewSchemaValidator } = require('../schemaValidator.js');

const validateReview = (req, res, next) => {
    let validationResult = reviewSchemaValidator.validate(req.body);
    if (validationResult.error) {     // if there is a error in schemaValidation, means if any field is missing in req.body
        throw new ExpressError(400, validationResult.error);
    }
    else {
        next();
    }
}

module.exports = validateReview;