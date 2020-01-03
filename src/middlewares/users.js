import validator from '../helpers/validator';
import model from "../db/models";
import role from '../db/models/role';

const { User, Role } = model;

class UserMiddleware {
    static async register(req, res, next) {
        const {
            email, mobile_number, password
        } = req.body;
        if (!validator.isValidEmail(email)) {
            res.status(400).json({
                error: 'Invalid email, please use this format: example@company.com'
            });
        } else if (!validator.isValidMobileNumber(mobile_number)) {
            res.status(400).json({
                error: 'Invalid mobile number, please use the following format: +250789837394'
            });
        } else if (!validator.isValidPassword(password)){
            res.status(400).json({
                error: 'Invalid password, please use the following format: Ed34$8k@4k'
            });
        } else {
            const findEmail = await User.findOne({ where: { email } });
            const findMobile = await User.findOne({ where: { mobile_number } })
            if (findEmail) {
                res.status(409).json({
                    error: 'Email already exists'
                });
            } else if (findMobile) {
                res.status(409).json({
                    error: 'Mobile number already exists'
                });
            }
            next()
        }
    }

    static async addRole(req, res, next) {
        const { name } = req.body
        const findRole = await Role.findOne({ where: { name }});
        if (findRole) {
            res.status(409).json({
                error: 'Role already exists'
            });
        }
        next()
    }
}

export default UserMiddleware;