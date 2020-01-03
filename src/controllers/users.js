import bcrypt from "bcrypt";
import model from "../db/models";
import processToken from "../helpers/processToken";
import sendVerificationEmail from "../helpers/sendVerificationEmail";

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
      const registerUser = await User.create(user);
      const { id } = registerUser.dataValues;
      const payload = { id, email };
      const token = await processToken.signToken(payload);
      const sendVerification = await sendVerificationEmail.send(token, email);
      if (sendVerification) {
        res.status(201).json({
          message:
            "Thank you for registration, You should check your email for verification",
          data: {
            token,
            id,
            email,
            mobile_number
          }
        });
      }
    } catch (error) {
      return res.status(409).json({
        error: "user with the same email already exist"
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} verification message
   */
  static async verification(req, res) {
    try {
      const findUser = await User.findOne({
        where: { email: req.query.email }
      });

      if (findUser) {
        if (findUser.is_active) {
          return res.status(202).json({
            message: "Email already Verified."
          });
        }
        await User.update(
          { is_active: true },
          { where: { id: findUser.id } }
        );
        return res.status(403).json({
          message: `User with ${findUser.email} has been verified`
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "internal server error! please try again later"
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
      const { name } = req.body;
      const registerRole = Role.create({
        name
      });
      res.status(201).json({
        message: "You have successfully registered new role",
        role: registerRole
      });
    } catch (error) {
      res.status(409).json({
        error: "Role already exists"
      });
    }
  }

  static async getRole(req, res) {
    try {
      const roles = await Role.findAll();
      res.status(200).json({
        message: "Roles successfully retrieved",
        roles
      });
    } catch (error) {
      res.status(409).json({
        error: "The requested roles were not found"
      });
    }
  }

  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns {Object} logged in user
   */
  static async login(req, res) {
    try {
      const findUser = await User.findOne({ where: { email: req.body.email } });

      if (findUser) {
        const {
          id, email, password, is_active
        } = findUser.dataValues;
        const userData = {
          id, email, password, is_active
        };
        if (!findUser.dataValues.is_active) {
          return res.status(401).json({
            message: 'Please check your email and click the button to verify your email'
          });
        }

        if (bcrypt.compareSync(req.body.password, userData.password)) {
          const payload = {
            id,
            email
          };
          const token = await processToken.signToken(payload);
          return res.status(200).json({
            message: 'User has been successfully logged in',
            user: {
              token,
              email: payload.email
            }
          });
        }
        return res.status(401).json({
          message: 'incorrect password'
        });
      }
      return res.status(404).json({
        message: `user with email: ${req.body.email} does not exist`
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error! please try again later'
      });
    }
  }
}

export default UserController;
