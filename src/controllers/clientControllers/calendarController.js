const calendar = require('../../services/clientServices/calendar');

module.exports = {
  async getCalendar(req, res) {
    try {
      const { camp } = req.query;
      const calendarData = await calendar.getCalendar(camp);
      return res.status(200).json({ calendarData });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

