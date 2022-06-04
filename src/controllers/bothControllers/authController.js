const auth = require("../../services/bothServices/auth");

module.exports = {
  async registration(req, res) {
    try {
      const { email, username, middlename, surname, phone, password, role } =
        req.body;
      const userExists = await auth.checkUserExists(email, role);
      if (userExists) {
        return res
          .status(409)
          .json({ message: 'User with this email is already exists' });
      }
      try {
        await auth.addToDb(
          email,
          username,
          middlename,
          surname,
          phone,
          password,
          role
        );
      } catch (error) {
        return res.status(500).json("add db error");
      }

      return res
        .status(200)
        .json({ message: 'User has been successfuly registered' });
    } catch (error) {
      return res.status(400).json({ message: "Incorrect data" });
    }
  },

  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      const isLogin = await auth.checkLogin(email, password, role);

      if (isLogin) {
        const { token, id } = isLogin;
        return res.status(200).json({ token, id });
      }

      return res.status(401).json({ message: "password or login invalid" });
    } catch (error) {
      return res.status(400).json({ message: "Wrong input" });
    }
  },

  async activation(req, res) {
    try {
      const { id, role, name } = req.body;
      const isActivated = await auth.updateActivation(id, role, name);

      if (isActivated) {
        const { token, userId } = isActivated;
        return res.status(200).json({ token, id: userId });
      }
      return res.status(500).json({ message: "we cant activate your account" });
    } catch (error) {
      return res.status(400).json({ message: "invalid id or role" });
    }
  },
};
