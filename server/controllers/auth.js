import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import expressJwt from 'express-jwt'
import Users from '../models/auth.js'
import config from '../config/config.js'
export const signUpController = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.status(404).json({
        message: "User already exists."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      name, email, password: hashedPassword
    })
    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    res.status(200).json({
      result: newUser, token
    })
} catch (error) {
  res.status(500).json("Something went wrong...")
}
}


export const logInController = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await Users.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exists"
      })}

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

      if (!isPasswordCorrect) {
        return res.status(404).json({
          message: "Invalid Credentials"
        })
      }

      const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
      },
      process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

    res.status(200).json({
      result: existingUser, token
    })
  } catch (error) {
    res.status(500).json("Something went wrong...")
  }
}
export const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}