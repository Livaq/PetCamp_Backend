const {
  getRooms,
} = require("../../controllers/adminControllers/adminController");
const db = require("../../dbConnect");

module.exports = {
  async getBookings(manager) {
    try {
      const bookingRequest = `select B.id, U.name as user_name, U.phone, A.city, A.street, PET.name, PET.type,B.booking_start, B.booking_end, B.is_active, B.want_disable
                               from booking as B
                               JOIN "user" as U ON U.id = B.user
                               JOIN "camp" as C ON C.id = B.camp
                               JOIN "address" as A ON A.id = C.address
                               JOIN "pet" as PET ON PET.id = B.pet
                               WHERE C.manager = $1 and B.is_deleted = false;`;
      const bookings = (await db.query(bookingRequest, [manager])).rows;
      return bookings;
    } catch (error) {
      throw Error("Error when get bookings");
    }
  },
  async getRooms(manager, date) {
    try {
      const camp = (
        await db.query("SELECT id FROM camp WHERE manager = $1", [manager])
      ).rows[0].id;
      const roomsRequest = `SELECT B.id, B.pet, B.room, P.name, R.room_number, P.id AS pet_id
                            FROM booking as B
                            JOIN pet as P ON B.pet = P.id
                            JOIN room as R ON R.id = B.room
                            WHERE P.is_deleted = false AND B.is_deleted = false AND B.camp = $1 AND $2 BETWEEN B.booking_start AND B.booking_end;`;
      const rooms = (await db.query(roomsRequest, [camp, date])).rows;
      const type = (
        await db.query("SELECT type FROM camp WHERE id = $1;", [camp])
      ).rows[0].type;
      return { rooms, type };
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async getReports(manager){
    try{
      const camp = (
        await db.query("SELECT id FROM camp WHERE manager = $1", [manager])
      ).rows[0].id;
      const reportsRequest = `SELECT B.id AS booking_id, B.is_deleted, R.id, R.write_time, P.name, P.type, B.booking_start, B.booking_end, R.appetite, R.play_time, R.stress_level, room.room_number, profile.surname AS manager_surname, U.name AS manager_name, R.report_number
                              FROM profile, "user" as U, booking AS B JOIN report AS R ON B.id = R.booking JOIN pet AS P ON P.id = B.pet JOIN room ON room.id = B.room
                              WHERE B.camp = $1 AND profile.id = $2 AND U.id = $2
                              ORDER BY R.write_time DESC`;
      const reports = (await db.query(reportsRequest, [camp, manager])).rows;
      return reports;
    }
    catch(e){
      throw new Error(e.message);
    }
  },
  async getReportNumber(book) {
    try {
      const ReportRequest = `SELECT * FROM report where report.booking = $1;`;
      const reportNumber = (await db.query(ReportRequest, [book])).rowCount;
      return reportNumber;
    } catch (error) {
      throw Error("Error when get reports");
    }
  },
  async postReport(report) {
    try {
      const { booking, writeTime, stressLevel, appetite, playTime, reportNumber } =
      report;
      await db.query(
        'INSERT INTO "report" (booking, write_time, stress_level, appetite, play_time, report_number) VALUES ($1, $2, $3, $4, $5, $6)',
        [booking, writeTime, stressLevel, appetite, playTime, reportNumber]
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getPet (petId){
    try{
      const petRequest = `SELECT id, name, type, breed, gender, age, sterilized, vet_pasport, info
      FROM pet
      WHERE id = $1`;
      const pet = (await db.query(petRequest, [petId])).rows;
      return pet;
    } catch(e){
      throw new Error(e.message);
    }
  },
  async disableBooking(id) {
    try {
      await db.query(
        'update booking set is_active = false, want_disable = false where booking.id = $1',
        [id]
      );
      return true;
    } catch (error) {
      throw Error('error when disable booking');
    }
  },
};
