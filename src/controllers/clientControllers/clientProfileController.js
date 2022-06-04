const clientProfile = require('../../services/clientServices/clientProfile');

module.exports = {
  async responseProfileInfo(req, res) {
    try {
      const { id } = req.params;

      const [petsInfo, bookingsInfo, reportsInfo] = await Promise.all([
        clientProfile.getPetsInfo(id),
        clientProfile.getBookingsInfo(id),
        clientProfile.getReportsInfo(id),
      ]);

      if (petsInfo && bookingsInfo && reportsInfo) {
        return res.status(200).json({ petsInfo, bookingsInfo, reportsInfo });
      }
      return res
        .status(500)
        .json({ message: 'backend problem to give profile info' });
    } catch (error) {
      return res.status(500).json({ message: 'cant give profile info' });
    }
  },
};
