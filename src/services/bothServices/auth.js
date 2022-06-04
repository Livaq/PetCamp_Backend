const uuid = require('uuid');
const emailSender = require('../../utils/email/emailSender');
const jwttoken = require('../../utils/token');
const db = require('../../dbConnect');
const hashPas = require('../../utils/hashPassword');
const Role = require('../../domain/role');

module.exports = {
  async checkUserExists(email, role) {
    try {
      const users = await db.query(
        'SELECT email, role FROM "user" WHERE email = $1 AND role = $2',
        [email, role]
      );
      const user = users.rowCount > 0;
      return user;
    } catch (error) {
      return false;
    }
  },

  async fullRegistr(
    email,
    username,
    middlename,
    surname,
    phone,
    hashPassword,
    role
  ) {
    try {
      const id = uuid.v4();
      if (role === Role.ADMIN) {
        await db.query(
          'INSERT INTO "user" (id, email, password, role, is_active, name) VALUES ($1, $2, $3, $4, $5, $6)',
          [id, email, hashPassword, role, true]
        );
      } else if (role === Role.CLIENT) {
        await Promise.all([
          db.query(
            'INSERT INTO "user" (id, email, password, role, is_active, name, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, email, hashPassword, role, false, username, phone]
          ),
          db.query(
            'INSERT INTO "profile" (id, surname, middlename) VALUES ($1, $2, $3)',
            [id, surname, middlename]
          ),
        ]);
        const token = await jwttoken.generateAccessToken(id, role, username);
        const url = `${process.env.FRONTEND_URL}/activation/${token}`;
        await emailSender.sendActivationMail(email, url);
      } else {
        return false;
      }
      return true;
    } catch (error) {
      throw Error('error in register');
    }
  },

  async addToDb(email, username, middleName, surname, phone, password, role) {
    try {
      const hashPassword = await hashPas.hashPassword(password);
      return this.fullRegistr(
        email,
        username,
        middleName,
        surname,
        phone,
        hashPassword,
        role
      );
    } catch (error) {
      throw Error('error in add to db');
    }
  },

  async checkPassword(user, password) {
    try {
      return hashPas.comparePasswords(password, user.password);
    } catch (error) {
      throw Error('check in password checking');
    }
  },

  async accessToken(user, password) {
    try {
      if (user[0].email) {
        const isPassword = await this.checkPassword(user[0], password);

        if (isPassword) {
          return jwttoken.generateAccessToken(
            user[0].id,
            user[0].role,
            user[0].name
          );
        }
      }
      return '';
    } catch (error) {
      throw Error('error in token generating');
    }
  },

  async checkLogin(email, password, role) {
    try {
      const user = (
        await db.query('SELECT * FROM "user" WHERE role = $1 AND email = $2', [
          role,
          email,
        ])
      ).rows;
      if (role === Role.ADMIN) {
        const token = await this.accessToken(user, password);
        if (!token) {
          throw Error('Invalid login or password');
        }
        return { token, id: user[0].id };
      }
      if (role === Role.CLIENT) {
        if (user[0].is_active) {
          const token = await this.accessToken(user, password);
          if (!token) {
            throw Error('Invalid login or password');
          }
          return { token, id: user[0].id };
        }
      }
      return {};
    } catch (error) {
      throw Error('error in check login');
    }
  },

  async updateActivation(id, role, name) {
    try {
      if (role === Role.CLIENT) {
        await db.query(
          'UPDATE "user" SET is_active = TRUE WHERE id = $1 AND role = $2',
          [id, role]
        );
        const token = jwttoken.generateAccessToken(id, role, name);
        return { token, id };
      }
      return {};
    } catch (error) {
      throw Error('error in activasion updatig');
    }
  },
};
