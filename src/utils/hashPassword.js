const bcrypt = require('bcrypt');

module.exports = {
  hashPassword(password) {
    return bcrypt.hash(password, 10);
  },

  comparePasswords(password, expected) {
    return bcrypt.compareSync(password, expected);
  },
};
