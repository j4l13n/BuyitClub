import model from "../db/models";

const { User, Role } = model;

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
      });
    } catch (error) {
      return res.status(409).json({
        error: 'user with the same email already exist'
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} role registered
   */
  static async addRole(req, res) {
    try {
      const {
        name
      } = req.body;
      const registerRole = Role.create({
        name
      });
      res.status(201).json({
        message: 'You have successfully registered new role',
        role: name
      });
    } catch (error) {
      res.status(409).json({
        error: 'Role already exists'
      });
    }
  }

  static async getRole(req, res) {
    try {
      const roles = await Role.findAll();
      res.status(200).json({
        message: 'Roles successfully retrieved',
        roles
      });
    } catch (error) {
      res.status(409).json({
        error: 'The requested roles were not found'
      });
    } 
  }
}

export default UserController;
