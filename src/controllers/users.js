import model from "../db/models";

const { User } = model;

class UserController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user registered
   */
  static async register(req, res) {
    try {
      const { mobile_number, email, password } = req.body;
      const user = {
        mobile_number,
        email,
        password
      }; 
      const registerUser = await User.create(user)
      res.status(201).json({
        message: 'Thank you for registration, You should check your email for verification',
        user: registerUser
      })
    } catch (error) {
      return res.status(409).json({
        error: 'user with the same email already exist'
      });
    }
  }
}

export default UserController;
