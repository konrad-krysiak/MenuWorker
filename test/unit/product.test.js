import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";
import { Op } from "sequelize";

import db from "../../src/models/index";

const { Restaurant, Product } = db;
chai.should();
chai.use(chaiHttp);

describe("Product unit testing", () => {
  let requester;
  let restaurantId;
  let menuId;
  let categoryId;
  let restaurantOfOtherUserId;
  let menuOfOtherUserId;
  let categoryOfOtherUserId;
  before(async () => {
    requester = chai.request.agent(app);
    await requester
      .post("/auth/login")
      .send({ email: "user1@gmail.com", password: "password1" });

    const restaurant = await Restaurant.create({
      name: "Product.test",
      address: "Product.test address",
      description: "Product.test description",
      phone: "999888555",
      website: "http://producttestwebsite.com",
      userId: 1,
    });

    const menu = await restaurant.createMenu({
      name: "test menu",
      itemCount: 0,
      userId: 1,
    });

    const category = await menu.createCategory({
      name: "test category",
    });

    const restaurantOfOtherUser = await Restaurant.create({
      name: "Product.test 2",
      address: "Product.test address 2",
      description: "Product.test description 2",
      phone: "999888442",
      website: "http://producttestwebsite.com",
      userId: 2,
    });

    const menuOfOtherUser = await restaurantOfOtherUser.createMenu({
      name: "test menu",
      itemCount: 0,
      userId: 2,
    });

    const categoryOfOtherUser = await menuOfOtherUser.createCategory({
      name: "test category",
    });

    restaurantId = restaurant.id;
    menuId = menu.id;
    categoryId = category.id;
    restaurantOfOtherUserId = restaurantOfOtherUser.id;
    categoryOfOtherUserId = categoryOfOtherUser.id;
    menuOfOtherUserId = menuOfOtherUser.id;
  });
  after(async () => {
    requester.close();
    await Restaurant.destroy({
      where: {
        id: {
          [Op.in]: [restaurantId, restaurantOfOtherUserId],
        },
      },
    });
  });

  it("POST /dashboard/products/new should create new product record", async () => {
    const response = await requester.post("/dashboard/products/new").send({
      name: "test product",
      price: 99,
      description: "test product description",
      menuId,
      categoryId,
    });
    response.should.have.status(200);
    const newProduct = await Product.findOne({
      where: { name: "test product", price: 99, categoryId },
    });
    (newProduct instanceof Product).should.be.true;
    newProduct.destroy();
  });

  it("PUT /dashboard/products/:id should edit product record", async () => {
    const product = await Product.create({
      name: "test product",
      price: 99,
      description: "test product description",
      categoryId,
    });
    const response = await requester
      .put(`/dashboard/products/${product.id}`)
      .send({
        name: "new product name",
        price: 200,
      });
    response.should.have.status(200);
    const updatedProduct = await Product.findByPk(product.id);
    updatedProduct.name.should.equal("new product name");
    updatedProduct.price.should.equal(200);
    updatedProduct.destroy();
  });

  it("DELETE /dashboard/products/:id should delete product", async () => {
    const product = await Product.create({
      name: "test product",
      price: 99,
      description: "test product description",
      categoryId,
    });
    const response = await requester.delete(
      `/dashboard/products/${product.id}`
    );
    response.should.have.status(200);
    const deletedProduct = await Product.findByPk(product.id);
    (deletedProduct === null).should.be.true;
  });

  it("User should not be able to create product for other user's restaurant", async () => {
    const response = await requester.post("/dashboard/products/new").send({
      name: "test product",
      price: 50,
      description: "test product description",
      menuId: menuOfOtherUserId,
      categoryId: categoryOfOtherUserId,
    });
    response.should.not.have.status(200);
    const productWhichShouldNotExist = await Product.findOne({
      where: {
        name: "test product",
        price: 50,
        description: "test product description",
        categoryId: categoryOfOtherUserId,
      },
    });
    console.log(productWhichShouldNotExist);
    (productWhichShouldNotExist === null).should.be.true;
  });
});
