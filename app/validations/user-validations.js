const User = require('../models/user-model')

const userRegisterValidationSchema = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        }
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        }
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        }
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password is required'
        }
    },
    role: {
        in: ['body'],
        exists: {
            errorMessage: 'role is required'
        }
    }
}

module.exports = { userRegisterValidationSchema }