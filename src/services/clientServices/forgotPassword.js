const db = require('../../dbConnect');
const hashPas = require('../../utils/hashPassword');

module.exports = {
  async getUserId(email, role) {
    try {
      const GET_USER_ID_QUERRY =
        'SELECT id FROM "user" WHERE email = $1 AND role = $2';
      const user = (await db.query(GET_USER_ID_QUERRY, [email, role])).rows[0];
      return user.id || '';
    } catch (error) {
      return '';
    }
  },

  async changeUserPassword(id, password) {
    try {
      const hashPassword = await hashPas.hashPassword(password);
      const GET_USER_ID_QUERRY =
        'UPDATE "user" SET password = $1 WHERE id = $2';
      await db.query(GET_USER_ID_QUERRY, [hashPassword, id]);
    } catch (error) {
      throw Error("Can't change password");
    }
  },
};
