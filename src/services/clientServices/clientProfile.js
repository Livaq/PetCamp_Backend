const db = require("../../dbConnect");

module.exports = {
  async getPetsInfo(id) {
    try {
      const pets = (
        await db.query(
          'SELECT id, name, age, gender, vet_pasport, type FROM "pet" WHERE owner = $1 and is_deleted = false LIMIT 2',
          [id]
        )
      ).rows;
      return pets;
    } catch (error) {
      throw Error('error in getting pets info');
    }
  },

  async getBookingsInfo(id) {
    try {
      const bookingRequest = `select B.id, A.city, A.street, P.name, B.booking_start, B.booking_end, R.room_number
      from booking as B
      join camp ON camp.id = B.camp
      join "address" as A ON A.id = camp.address
      join pet as P ON P.id = B.pet
      join room as R ON R.id = B.room
      where P.owner = $1 and B.is_deleted = false
      order by B.booking_start DESC, B.booking_end ASC
      limit 2`;
      const bookings = (await db.query(bookingRequest, [id])).rows;
      return bookings;
    } catch (error) {
      throw Error('error in getting bookings info');
    }
  },

  async getReportsInfo(id) {
    try {
      const reportQuery = `select R.write_time, R.booking, R.id, R.report_number, P.name as pet_name, R.stress_level, R.appetite, R.play_time, "user".name, profile.surname, room.room_number, room.video, B.is_active
      from report as R
      join booking as B on B.id = R.booking
      join pet as P on B.pet = P.id
      join camp as C on B.camp = C.id
      join room on room.id = B.room
      join "user" on c.manager = "user".id
      join profile on "user".id = "profile".id
      where B.user = $1 and B.is_deleted = false
      order by R.write_time desc
      limit 2`;
      const reports = (await db.query(reportQuery, [id])).rows;
      return reports;
    } catch (error) {
      throw new Error(error);
    }
  },
};
