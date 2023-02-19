"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        uuid: "44ec6726-9771-4d00-b183-fb8f71a4e767",
        name: "User 1",
        email: "user1@gmail.com",
        phone: "111111111",
        password:
          "$2b$10$FuzUrNfMGoLSkHhnNITBYuwNkERKxJlL8CGAShnVpMrid1ZJbZ5NK",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
      },
      {
        uuid: "4cf34962-93d3-495a-aab2-64d6ec8ac3e8",
        name: "User 2",
        email: "user2@gmail.com",
        phone: "222222222",
        password:
          "$2b$10$Qma/yficM/KkBwCyAxsu.OO.MYLnQRj.Wy5U1pGZwGypoqP2LLUTC",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
