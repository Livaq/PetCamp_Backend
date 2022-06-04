const Role = require('../../domain/role');
const forgotPassword = require('../../services/clientServices/forgotPassword');
const emailSender = require('../../utils/email/emailSender');

module.exports = {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const userId = await forgotPassword.getUserId(email, Role.CLIENT);
      if (userId) {
        const url = `${process.env.FRONTEND_URL}/forgot-password/${userId}`;
        emailSender.sendForgotPasswordMail(email, url);
        return res
          .status(200)
          .json({ message: 'Email was sended on your email address' });
      }
      return res
        .status(400)
        .json({ message: 'Acccount with this email not found' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `We cant send the emale: ${error}` });
    }
  },

  async changePassword(req, res) {
    try {
      const { id, password } = req.body;
      if (id && password) {
        forgotPassword.changeUserPassword(id, password);
        return res
          .status(200)
          .json({ message: 'Password successfully changed' });
      }
      return res.status(400).json({ message: 'Wrong input' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
