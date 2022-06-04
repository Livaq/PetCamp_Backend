const emailAccount = require('./emailAccount');

module.exports = {
  sendActivationMail(email, url) {
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'activation',
      text: `To activate your account follow this link ${url}`,
    };
    emailAccount.sendMail(message, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  },

  sendForgotPasswordMail(email, url) {
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Forgot password',
      text: `To change your password follow this link ${url}`,
    };
    emailAccount.sendMail(message, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  },
};
