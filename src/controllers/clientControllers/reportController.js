const report = require('../../services/clientServices/report');

module.exports = {
  async receiveReports(req, res) {
    try {
      const { id } = req.params;
      const reportRequest = await report.getReports(id);
      return res.status(200).json({ reportRequest });
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  },
};
