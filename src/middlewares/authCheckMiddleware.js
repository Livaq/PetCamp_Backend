require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('authorization');
    const { id } = await jwt.verify(token.split(' ')[1], process.env.SECRET);
    req.user = id;
    next();
  } catch {
    return res.status(401).json('Token is invalid');
  }
};
