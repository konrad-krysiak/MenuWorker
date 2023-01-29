"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Restaurants", [
      {
        id: 1,
        uuid: "e532d2c2-2dd7-40f4-9f3e-454be5eb00e1",
        name: "Restaurant 1",
        address: "Address 1",
        description: "Description 1",
        phone: "111111111",
        website: "https://restaurant1.com",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        userId: 1,
      },
      {
        id: 2,
        uuid: "07c03233-7ad2-4034-8095-a7eefbe44615",
        name: "Restaurant 2",
        address: "Address 2",
        description: "Description 2",
        phone: "222222222",
        website: "https://restaurant2.com",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        userId: 1,
      },
      {
        id: 3,
        uuid: "75529dfe-18f3-4d0c-bc38-2f3878404c71",
        name: "Restaurant 3",
        address: "Address 3",
        description: "Description 3",
        phone: "333333333",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
