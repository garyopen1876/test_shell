"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          card_id: "1745718229",
          name: "corbin",
          mail: "corbinn0419@gmail.com",
          phone: "0911111111",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          card_id: "3128896260",
          name: "bohan",
          mail: "4A790162@stust.edu.tw",
          phone: "0933333333",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          card_id: "1234567890",
          name: "han",
          mail: "qazwsx147866@gmail.com",
          phone: "0922222222",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          card_id: "1255870309",
          name: "gary",
          mail: "garyopen1876@gmail.com",
          phone: "0944444444",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
