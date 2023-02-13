import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

import db from "../../src/models/index";

const { Restaurant, Menu, Category } = db;
chai.should();
chai.use(chaiHttp);

describe("Category unit testing", () => {
  let requester;
  let restaurantId;
  before(async () => {
    requester = chai.request.agent(app);
    await requester
      .post("/auth/login")
      .send({ email: "user1@gmail.com", password: "password1" });

    const restaurant = (
      await Restaurant.findOrCreate({
        where: {
          name: "Category.test",
          address: "Category.test address",
          description: "Category.test description",
          phone: "999888555",
          website: "http://categorytestwebsite.com",
          userId: 1,
        },
      })
    )[0];
    restaurantId = restaurant.id;

    await Menu.bulkCreate([
      {
        name: "CategoryTestMenuPOST",
        itemCount: 0,
        userId: 1,
        restaurantId: restaurant.id,
      },
      {
        name: "CategoryTestMenuPUT",
        itemCount: 0,
        userId: 1,
        restaurantId: restaurant.id,
      },
      {
        name: "CategoryTestMenuDELETE",
        itemCount: 0,
        userId: 1,
        restaurantId: restaurant.id,
      },
    ]);
  });
  after(async () => {
    requester.close();
    await Menu.destroy({ where: { restaurantId } });
    await Restaurant.destroy({ where: { id: restaurantId } });
  });

  it("POST /dashboard/categories/new should add new category", async () => {
    const menu = await Menu.findOne({
      where: { name: "CategoryTestMenuPOST" },
    });
    const response = await requester.post("/dashboard/categories/new").send({
      name: "POST test category",
      menuId: menu.id,
    });
    response.should.have.status(200);
    const createdCategory = await Category.findOne({
      where: { name: "POST test category", menuId: menu.id },
    });
    (createdCategory instanceof Category).should.be.true;
    await createdCategory.destroy();
  });

  it("PUT /dashboard/categories/:id should update category record", async () => {
    const menu = await Menu.findOne({ where: { name: "CategoryTestMenuPUT" } });
    const category = await menu.createCategory({
      name: "category test",
    });
    const response = await requester
      .put(`/dashboard/categories/${category.id}`)
      .send({
        name: "new category name",
      });
    response.should.have.status(200);
    const updatedCategory = await Category.findByPk(category.id);
    updatedCategory.name.should.equal("new category name");
  });

  it("DELETE /dashboard/categories/:id should delete record", async () => {
    const menu = await Menu.findOne({
      where: { name: "CategoryTestMenuDELETE" },
    });
    const category = await menu.createCategory({ name: "category test" });
    const response = await requester.delete(
      `/dashboard/categories/${category.id}`
    );
    response.should.have.status(200);
    const deletedCategory = await Category.findByPk(category.id);
    (deletedCategory === null).should.be.true;
  });
});
