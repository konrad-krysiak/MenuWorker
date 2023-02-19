"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("Products", [
      {
        uuid: "628a7865-b12f-4bcd-8de8-f5eb906d1726",
        name: "Product 1 category 1",
        description: "description for product 1",
        price: 15.99,
        image:
          "https://storage.googleapis.com/bucket-quickstart-konrad/A-Cat.jpg",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 1,
      },
      {
        uuid: "1896d40f-2701-460d-8674-c7bb610c7d28",
        name: "Product 2 category 1",
        description: "description for product 2",
        price: 20.99,
        image:
          "https://storage.googleapis.com/bucket-quickstart-konrad/Young_cats.jpg",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 1,
      },
      {
        uuid: "975af9d3-704d-4cfd-9153-5ad1b689f591",
        name: "Product 3 category 1",
        description: "description for product 3",
        price: 9.99,
        image:
          "https://storage.googleapis.com/bucket-quickstart-konrad/cat_feline_cats_eye_215231.jpg",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 1,
      },
      {
        uuid: "008cabfb-6ca3-4018-91e9-0357ff62c5f9",
        name: "Product 4 category 2",
        description: "description for product 4",
        price: 9.99,
        image:
          "https://storage.googleapis.com/bucket-quickstart-konrad/p07ryyyj.jpg",
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 2,
      },
      {
        uuid: "8a264f5e-9f4e-45a9-8698-3b6cb6bc056e",
        name: "Product 5 category 2",
        description: "description for product 5",
        price: 5.99,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 2,
      },
      {
        uuid: "0440ebeb-c2d5-42e1-b666-f553fbd30637",
        name: "Product 6 category 3",
        description: "description for product 6",
        price: 12.0,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 3,
      },
      {
        uuid: "1995c195-efcb-4679-8524-d7bef39de6c9",
        name: "Product 7 category 5",
        description: "description for product 7",
        price: 555.0,
        createdAt: new Date("2019-04-07T10:20:30Z"),
        updatedAt: new Date("2019-04-07T10:20:30Z"),
        categoryId: 5,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
