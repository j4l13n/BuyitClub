import model from "../db/models";

const { Business, BusinessCategories, PaymentMethod, User, Category } = model;

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
			const user = await User.findByPk(req.user.id);
			// Populate BusinessUser join table
			await createBusiness.addUser(user);
			const userBusiness = await User.findByPk(req.user.id, {
				include: [{
					model: Business,
					as: 'businesses',
					attributes: ['id', 'legalName']
			}]
			})
      res.status(201).json({
        message: "Business created successfully",
        data: userBusiness
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
	 * @returns {Object} returns added category
	 */
	static async createCategory(req, res) {
		try {
			const {
				name,
				image,
				description,
				parent,
				url
			} = req.body;
	
			const category = {
				name,
				image,
				description,
				parent,
				url
			};
			const createCategory = await Category.create(category);
			res.status(201).json({
				message: 'You have created a category successfully',
				data: createCategory
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
	static async addBusinessCategory(req, res) {
		try{
			const {
				categoryId,
				businessId
			} = req.body;
			const category = {
				categoryId,
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
