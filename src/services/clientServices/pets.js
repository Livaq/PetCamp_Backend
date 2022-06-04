const uuid = require('uuid');
const db = require('../../dbConnect');

module.exports = {
  async getPetsList(id, type) {
    try {
      if (type === 'ALL') {
        const pets = (
          await db.query(
            'SELECT * FROM "pet" WHERE owner = $1 AND is_deleted = false;',
            [id]
          )
        ).rows;
        return pets;
      }
      const pets = (
        await db.query(
          'SELECT * FROM "pet" WHERE owner = $1 AND type = $2 AND is_deleted = false;',
          [id, type]
        )
      ).rows;
      return pets;
    } catch (error) {
      throw Error('error in getting pet list');
    }
  },

  async postPet(pet, owner) {
    try {
      const { name, type, breed, gender, age, sterilized, passport, info } =
        pet;
      const id = uuid.v4();
      await db.query(
        'INSERT INTO "pet" (id, name, breed, age, vet_pasport, owner, type, gender, info, sterilized) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [id, name, breed, age, passport, owner, type, gender, info, sterilized]
      );
      return { id, name, type, breed, gender, age, sterilized, passport, info };
    } catch (error) {
      throw Error('successfully added pet');
    }
  },

  async deletePet(petId) {
    try {
      const petInBooking = await db.query(
        'select id from booking where pet = $1 and is_deleted = false',
        [petId]
      );
      if (petInBooking.rowCount > 0) {
        return false;
      }
      await db.query('update pet set is_deleted = true where id = $1', [petId]);
      return true;
    } catch (error) {
      throw Error('successfully deleted pet');
    }
  },
};
