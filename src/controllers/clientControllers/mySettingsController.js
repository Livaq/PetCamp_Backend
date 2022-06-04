const mySettings = require('../../services/clientServices/mySettings');

module.exports = {
  async responseMySettings(req, res) {
    try {
      const { id } = req.params;

      const mySettingsInfo = await mySettings.getMySettings(id);

      if (mySettingsInfo) {
        return res.status(200).json({ mySettingsInfo });
      }
      return res
        .status(500)
        .json({ message: 'backend problem to give settings info' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async sendMySettings(req, res) {
    try {
      const settings = req.body;
      await mySettings.putMySettings(settings);
      return res
        .status(200)
        .json({ message: 'Settings was successfully added' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
};
