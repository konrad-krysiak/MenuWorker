import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

import db from "../../src/models/index";

const { Restaurant, Menu } = db;
chai.should();
chai.use(chaiHttp);

describe("Menu unit testing", () => {
  let requester;
  let restaurantId;
  before(async () => {
    requester = chai.request.agent(app);
    await requester
      .post("/auth/login")
      .send({ email: "user1@gmail.com", password: "password1" });

    const restaurant = await Restaurant.findOrCreate({
      where: {
        name: "Menu.test restaurant",
        address: "Menu.test address",
        description: "Menu.test description",
        phone: "999888777",
        website: "http://menutestwebsite.com",
        userId: 1,
      },
    });
    restaurantId = restaurant[0].id;
  });
  after(() => {
    requester.close();
  });

  it("GET /dashboard/menus should return proper status", (done) => {
    requester.get("/dashboard/menus").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it("GET /dashboard/menus/new should return proper status", (done) => {
    requester
      .get("/dashboard/menus/new?restaurantId=" + restaurantId)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("POST /dashboard/menus/new should create new menu", async () => {
    const response = await requester
      .post("/dashboard/menus/new")
      .send({ name: "menu test", restaurantId });
    response.should.have.status(200);
    response.should.redirectTo(/w*\/dashboard\/menus$/);
    const newMenu = await Menu.findOne({ where: { name: "menu test" } });
    (newMenu instanceof Menu).should.be.true;
  });

  it("PUT /dashboard/menus/:id should edit menu properly", async () => {
    const newMenu = (
      await Menu.findOrCreate({
        where: {
          name: "testMenu",
          restaurantId,
          itemCount: 0,
          userId: 1,
        },
      })
    )[0];
    const response = await requester
      .put("/dashboard/menus/" + newMenu.id)
      .send({ name: "new menu test" });
    response.should.have.status(200);
    response.should.redirectTo(/w*\/edit$/); // redirects to menu editor
    const updatedMenu = await Menu.findByPk(newMenu.id);
    updatedMenu.name.should.equal("new menu test");
  });

  it("GET /dashboard/menus/:id/edit should return proper status", async () => {
    const menu = (
      await Menu.findOrCreate({
        where: {
          name: "testMenu",
          restaurantId,
          itemCount: 0,
          userId: 1,
        },
      })
    )[0];
    const response = await requester.get(`/dashboard/menus/${menu.id}/edit`);
    response.should.have.status(200);
  });

  it("Adding product to menu should increment its itemCount property", async () => {
    const menu = await Menu.create({
      name: "testIncrementMenu",
      restaurantId,
      itemCount: 0,
      userId: 1,
    });
    const category = await menu.createCategory({
      name: "testCategory",
    });
    await category.createProduct({
      name: "test prod",
      description: "test desc",
      price: 15,
    });
    const menuV2 = await Menu.findOne({ where: { name: "testIncrementMenu" } });
    menuV2.itemCount.should.equal(1);
  });

  it("DELETE /dashboard/menus/:id should delete menu", async () => {
    const menu = (
      await Menu.findOrCreate({
        where: {
          name: "testMenu",
          restaurantId,
          itemCount: 0,
          userId: 1,
        },
      })
    )[0];
    const response = await requester.delete("/dashboard/menus/" + menu.id);
    response.should.have.status(200);
    const deletedMenu = await Menu.findByPk(menu.id);
    (deletedMenu === null).should.be.true;
  });
});
