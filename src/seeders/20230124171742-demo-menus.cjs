"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Menus", [
      {
        id: 1,
        uuid: "04329d6e-cf63-4738-b585-2ce60b491437",
        name: "Menu 1",
        itemCount: 5,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        restaurantId: 1,
        userId: 1,
      },
      {
        id: 2,
        uuid: "fe5fd2e7-5a5a-4cfe-92b9-74416e64dfbe",
        name: "Menu 2",
        itemCount: 1,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        restaurantId: 1,
        userId: 1,
      },
      {
        id: 3,
        uuid: "bd57e396-4a86-4027-a2f2-778971c7c3f0",
        name: "Menu 3",
        itemCount: 0,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        restaurantId: 2,
        userId: 1,
      },
      {
        id: 4,
        uuid: "67c1ac48-cfa5-470e-babe-c906a9127404",
        name: "Menu 4",
        itemCount: 1,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        restaurantId: 3,
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
