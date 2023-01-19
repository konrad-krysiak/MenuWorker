"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Restaurants", [
      {
        uuid: uuidv4(),
        name: "Restaurant 1",
        address: "Address 1",
        description: "description 11",
        phone: "111111111",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        uuid: uuidv4(),
        name: "Restaurant 2",
        address: "Address 2",
        description: "description 2",
        phone: "222222222",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        uuid: uuidv4(),
        name: "Restaurant 3",
        address: "Address 3",
        description: "description 3",
        phone: "333333333",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
