const db = require('../../dbConnect');

module.exports = {
  async getMySettings(id) {
    try {
      const mySettingsQuery = `select  U.name, P.middlename, P.surname, U.email, P.city, P.street, U.phone
      from profile as P
      join "user" as U ON U.id = P.id
      where P.id = $1`;
      const mySettings = (await db.query(mySettingsQuery, [id])).rows;

      return mySettings;
    } catch (error) {
      throw new Error(error);
    }
  },
  async putMySettings(settings) {
    try {
      const { userId, name, middlename, surname, city, street, phone } =
        settings;
      await db.query('UPDATE "user" SET name = $2, phone = $3 where id = $1', [
        userId,
        name,
        phone,
      ]);
      await db.query(
        'UPDATE "profile" SET surname = $2, middlename = $3, city =$4, street = $5  where id = $1',
        [userId, surname, middlename, city, street]
      );
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
};
