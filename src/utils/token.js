const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken(id, role, name) {
    const payload = {
      id,
      role,
      name,
    };

    return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
  },
};
