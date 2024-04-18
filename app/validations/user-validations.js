const User = require('../models/user-model')

const passwordValidation = (value) => {
    const upperCaseRegex = /[A-Z]/
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    const numberRegex = /[0-9]/
    return upperCaseRegex.test(value) && specialCharRegex.test(value) && numberRegex.test(value)
}

const userRegisterValidationSchema = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        custom: {
            options: async function (value) {
                const user = await User.findOne({ email: value })
                if (user) {
                    throw new Error('email already taken')
                } else {
                    return true
                }
            }
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: "password should be between 8-128 character"
        },
        custom: {
            options: (value) => {
                if (!passwordValidation(value)) {
                    throw new Error('Password must contain at least one uppercase letter and one special character and one number.')
                } else {
                    return true
                }
            }
        },
        trim: true
    },
    role: {
        in: ['body'],
        exists: {
            errorMessage: 'role is required'
        },
        notEmpty: {
            errorMessage: 'role cannot be empty'
        },
        isIn:{
            options: [['member', 'librarian']],
            errorMessage: 'role either should be a member or librarian'
        }
    }
}

const userLoginValidationSchema = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: "password should be between 8-128 character"
        },
        custom: {
            options: (value) => {
                if (!passwordValidation(value)) {
                    throw new Error('Password needs 1 uppercase, 1 special character, and 1 number.')
                } else {
                    return true
                }
            }
        },
        trim: true
    }
}

module.exports = { userRegisterValidationSchema, userLoginValidationSchema }