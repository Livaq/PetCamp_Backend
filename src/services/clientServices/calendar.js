const db = require('../../dbConnect');

const query = `SELECT COUNT(*) 
              FROM booking 
              WHERE 
              (booking.camp = $1) AND (is_deleted = false) AND 
              ($2 BETWEEN booking_start AND booking_end)`;

module.exports = {
  async getCalendar(camp){
    try{
      const occupiedRoomsNumberPromises = [];
      const dates = [];
      let date = new Date();

      for(let i = 0; i < 60; i++){
        const ISODate = date.toISOString().split('T')[0];
        dates.push(ISODate);
        occupiedRoomsNumberPromises.push(db.query(query, [camp, ISODate]));
        date.setDate(date.getDate() + 1);
      }

      const occupiedRoomsNumber = (await Promise.all(occupiedRoomsNumberPromises)).map(item => item.rows[0].count);
      const calendarInfo = {};
      for(let i = 0; i < 60; i++){
        calendarInfo[dates[i]] = +occupiedRoomsNumber[i];
      }
      return calendarInfo;
    }
    catch (error) {
      throw Error(`Error when getting calendar: ${error.message}`);
    }
  }
}