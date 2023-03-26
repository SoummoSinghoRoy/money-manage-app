const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const registrationValidator = require('../validator/auth/registrationValidator');
const User = require('../model/User');
const logInValidator = require('../validator/auth/logInvalidator');
const { resourceError, serverError } = require('../utils/error');

exports.userRegistrationPostController = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const validation = registrationValidator({ name, email, password, confirmPassword })

  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      bcrypt.hash(password, 12, async (err, hash) => {
        if (err) {
          return serverError(res, err)
        }

        let registerUser = new User({
          name,
          email,
          password: hash,
          netBalance: 0,
          income: 0,
          expense: 0,
          transactions: []
        })

        await registerUser.save()
        res.status(200).json({
          msg: "User created successfully",
          registerUser
        })
      })
    } else {
      resourceError(res, "Email already exist")
    }

  } catch (error) {
    serverError(res, error)
  }
}

exports.userlogInPostController = async (req, res) => {
  const { email, password } = req.body;
  const validation = logInValidator({ email, password })

  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }
  
  try {
    const user = await User.findOne({email})

    if(!user) {
      resourceError(res, "User not found")
    }else {
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) {
          return serverError(res, err)
        }
        if(!result) {
          return resourceError(res, "Incorrect password")
        }

        const token = jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          netBalance: user.netBalance,
          income: user.income,
          expense: user.expense,
          transaction: user.transactions // here include transaction id so populated from transaction
        }, config.get("secret"), { expiresIn: "10h" })

        res.status(200).json({
          Message: "Login successfully",
          token: `Bearer ${token}`
        })
      })
    }

  } catch (error) {
    serverError(res, error)
  }
}