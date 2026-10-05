const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache.js");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }

  // const isTokenBlacklisted = await blacklistModel.findOne({
  //   token,
  // });

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "token is invalid",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token, Unauthorized user",
    });
  }

  req.user = decoded;

  next();
}

module.exports = authUser;
