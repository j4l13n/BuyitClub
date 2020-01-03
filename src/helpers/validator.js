class Validator {
    /**
     * 
     * @param {String} email
     * @returns true if email is valid
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * 
     * @param {String} password 
     * @returns true if password is valid
     */
    isValidPassword(password) {
        if(/\s/.test(password)) {
            return false;
        } else if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {String} number
     * @return true if it is a valid number 
     */
    isValidNumber(number) {
        return /^\d*$/.test(number);
    }

    /**
     * 
     * @param {String} name
     * @return true if name is has only character and one space 
     */
    isValidName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }

    /**
     * 
     * @param {String} number
     * @returns boolean
     */
    isValidMobileNumber(number) {
        return /(^[+0-9]{1,3})*([0-9]{10,11}$)/.test(number)
    }
}

const validator = new Validator();
export default validator;