"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Categories", [
      {
        uuid: "adaa9196-bd3a-4b1e-9202-9d0af84e5252",
        name: "Category 1 menu 1",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        menuId: 1,
      },
      {
        uuid: "4d814fc2-94fd-4beb-985a-c0f58257dd65",
        name: "Category 2 menu 1",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        menuId: 1,
      },
      {
        uuid: "2dbfc577-d56d-4c7e-84d0-44ef93304078",
        name: "Category 3 menu 2",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        menuId: 2,
      },
      {
        uuid: "2dbfc577-d56d-4c7e-84d0-44ef93304078",
        name: "Category 4 menu 3",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        menuId: 3,
      },
      {
        uuid: "c246a597-8819-425d-8325-0a2c1bd2fdee",
        name: "Category 4 menu 5",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        menuId: 4,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
