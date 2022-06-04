const booking = require('../../services/clientServices/booking');

module.exports = {
  async sendBooking(req, res) {
    try {
      const bookingRequest = req.body;
      await booking.postBooking(bookingRequest);
      return res
        .status(200)
        .json({ message: 'Booking was successfully added' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },

  async receiveUserBooking(req, res) {
    try {
      const bookingRequest = req.params;
      const allUserBookings = await booking.receiveUserBooking(bookingRequest);
      return res.status(200).json({ booking: allUserBookings });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `error in receiving bookings: ${error.message}` });
    }
  },

  async disableBooking(req, res) {
    try {
      const { id } = req.params;
      await booking.disableBooking(id);
      return res
        .status(200)
        .json({ message: 'request to disable booking was sended' });
    } catch (error) {
      return res.status(500).json({
        message: `error in disable booking: ${error.message}`,
      });
    }
  },

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      await booking.deleteBooking(id);
      return res
        .status(200)
        .json({ message: 'booking was succesfully deleted' });
    } catch (error) {
      return res.status(500).json({
        message: `error in deleting bookings: ${error.message}`,
      });
    }
  },
};
