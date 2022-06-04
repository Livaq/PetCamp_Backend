const db = require('../../dbConnect');

const GET_REPORT_QUERY = `select R.write_time, R.booking, R.id, R.report_number, P.name as pet_name, R.stress_level, R.appetite, R.play_time, "user".name, profile.surname, room.room_number,B.is_active
from report as R
join booking as B on B.id = R.booking
join pet as P on B.pet = P.id
join camp as C on B.camp = C.id
join room on room.id = B.room
join "user" on c.manager = "user".id
join profile on "user".id = "profile".id
where B.user = $1 and B.is_deleted = false
order by R.write_time desc`;

module.exports = {
  async getReports(id) {
    try {
      const reports = (await db.query(GET_REPORT_QUERY, [id])).rows;
      return reports;
    } catch (error) {
      throw Error(`Error when getting reports: ${error.message}`);
    }
  },
};
