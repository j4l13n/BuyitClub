import model from "../db/models";

const { Business, BusinessCategories, PaymentMethod } = model;

class BusinessController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns created business
   */
  static async createBusiness(req, res) {
    try {
      const {
        legalName,
        tradingName,
        businessEmail,
        businessMobileNumber,
        businessPlan,
        country,
        city
      } = req.body;
      const business = {
        legalName,
        tradingName,
        businessEmail,
        businessMobileNumber,
        businessPlan,
				country,
				city
      };
      const createBusiness = await Business.create(business);
      res.status(201).json({
        message: "Business created successfully",
        data: createBusiness
      });
    } catch (error) {
      res.status(409).json({
        error: "Something went wrong when creating a business"
      });
    }
	}
	
	/**
	 * 
	 * @param {Object} req 
	 * @param {Object} res 
	 * @return {Object} created category
	 */
	static async addCategory(req, res) {
		try{
			const {
				categoryName,
				businessId
			} = req.body;
			const category = {
				categoryName,
				businessId
			}
			const createCategory = await BusinessCategories.create(category);
			res.status(201).json({
				message: "Category added to your business successfully",
				data: createCategory
			});
		} catch (error) {
			res.status(409).json({
				error: "Something went wrong when adding categories to your business"
			});
		}
	}

	/**
	 * 
	 * @param {Object} req 
	 * @param {Object} res 
	 * @returns {Object} returns added payment method
	 */
	static async addPaymentMethod(req, res) {
		try {
			const {
				name,
				businessId
			} = req.body;
			const payment = {
				name,
				businessId
			};
			const createPayment = await PaymentMethod.create(payment);
			res.status(201).json({
				message: "You have successfully added payment method to your business",
				data: createPayment
			});
		} catch (error) {
			res.status(409).json({
				error: "Something went wrong when adding categories to your business"
			});
		}
	}
}

export default BusinessController;
