"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          username: process.env.SUPER_USER_USERNAME,
          password: bcrypt.hashSync(process.env.SUPER_USER_PASSWORD, bcrypt.genSaltSync(10)),
          mail: process.env.SUPER_USER_MAIL,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
