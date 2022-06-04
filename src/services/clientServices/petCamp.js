const db = require('../../dbConnect');

module.exports = {
  async getPetCamps() {
    try {
      const petCamps = (
        await db.query(
          'SELECT city, street, latitude, longitude, camp.type, camp.id FROM address JOIN camp ON camp.address = address.id',
        )
      ).rows;
      return petCamps;
    } catch (error) {
      throw Error('error in getting pet camps');
    }
  },

  async getOccupiedRooms(id, start, end) {
    try {
      const query = `SELECT room.id, room.room_number 
      FROM booking 
      JOIN room ON room.id = booking.room
      WHERE booking.camp = $1 AND booking.is_deleted = false AND 
      (($2 BETWEEN booking_start AND booking_end) 
      OR ($3 BETWEEN booking_start AND booking_end) OR (booking_start BETWEEN $2 AND $3) 
      OR (booking_end BETWEEN $2 AND $3));`;
      const occupiedRooms = await db.query(query, [id, start, end]);
      return occupiedRooms.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getAllRooms(id) {
    try {
      const query = `SELECT room.id, room.room_number 
      FROM room 
      WHERE room.camp = $1;`;
      const rooms = await db.query(query, [id]);
      return rooms.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
