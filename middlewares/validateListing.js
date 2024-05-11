//middleware to validate listing
const ExpressError = require('../utils/ExpressError.js');
const { listingSchemaValidator, reviewSchemaValidator } = require('../schemaValidator.js');

const validateListing = (req, res, next) => {
    let validationResult = listingSchemaValidator.validate(req.body);
    if (validationResult.error) {     // if there is a error in schemaValidation, means if any field is missing in req.body
        throw new ExpressError(400, validationResult.error);
    }
    else {
        next();
    }
}

module.exports = validateListing;