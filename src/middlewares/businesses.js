import model from "../db/models";
import validator from "../helpers/validator";

const { Business } = model;

class BusinessMiddleware {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} returns next
   */
  static async create(req, res, next) {
    const {
      legalName,
      tradingName,
      businessEmail,
      businessMobileNumber,
      businessPlan,
    } = req.body;

    if (!validator.isValidName(legalName) || !validator.isValidName(tradingName)) {
        res.status(400).json({
            error: ''
        });
    } else if (!validator.isValidEmail(businessEmail)) {
        res.status(400).json({
            error: 'Invalid email, please use this format: example@company.com'
        });
    } else if (!validator.isValidMobileNumber(businessMobileNumber)) {
        res.status(400).json({
            error: 'Invalid mobile number, please use the following format: +250789837394'
        });
    } else if (!validator.isValidBusinessPlan(businessPlan)) {
        res.status(400).json({
            error: 'Invalid plan, please use Free, Standard or Premium '
        });
    } else {
        next();
    }
  }
}

export default BusinessMiddleware;
