import jwt from "jsonwebtoken"
import AsyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protect = AsyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not Authorized, Token Failed")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not Authorized, Token Not Found")
  }
})

const owner = (req, res, next) => {
  if (req.user && req.user.role === "Owner") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an Owner")
  }
}

const support = (req, res, next) => {
  if (req.user && req.user.role === "Support") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as a Support")
  }
}

export { protect, owner }
