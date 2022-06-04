const admin = require('../../services/adminServices/admin');

module.exports = {
  async getClientsBooking(req, res) {
    try {
      const { manager } = req.params;
      const bookings = await admin.getBookings(manager);
      return res.status(200).json({ bookings });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error when getting client bookings' });
    }
  },
  async getRooms(req, res){
    try{
      const {manager, date} = req.query;
      const typeAndRoomsInfo = await admin.getRooms(manager, date);
      return res.status(200).json({typeAndRoomsInfo});
    }
    catch(e){
      console.log(e.message);
    }
  },
  async getReports(req, res){
    try{
      const {manager} = req.query;
      const reports = await admin.getReports(manager);
      return res.status(200).json({reports});
    }
    catch(e){
      console.log(e.message);
    }
  },
  async getReportNumber(req, res) {
    try {
      const { book } = req.query;
      const reportNumber = await admin.getReportNumber(book);
      return res.status(200).json({ reportNumber });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error when getting admin reports' });
    }
  },
  async postReport(req, res){
    try {
      const report = req.body;
      await admin.postReport(report);
      return res.status(200).json({ message: 'Report was successfully added' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
  async getPet(req, res) {
    try{
      const {petId} = req.params;
      const pet = await admin.getPet(petId);
      return res.status(200).json({pet});
    } catch (e){
      return res
        .status(500)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
  async disableBooking(req, res) {
    try {
      const { id } = req.params;
      await admin.disableBooking(id);
      return res
        .status(200)
        .json({ message: 'booking was succesfully disabled' });
    } catch (error) {
      return res.status(500).json({
        message: `error in disable booking: ${error.message}`,
      });
    }
  },
};

