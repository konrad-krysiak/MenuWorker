import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

import db from "../../src/models/index";

const { Restaurant } = db;
chai.should();
chai.use(chaiHttp);

describe("Restaurant unit testing", () => {
  let requester;
  before(async () => {
    requester = chai.request.agent(app);
    await requester
      .post("/auth/login")
      .send({ email: "user1@gmail.com", password: "password1" });
  });
  after(() => {
    requester.close();
  });
  it("GET /restaurants should return proper status", (done) => {
    requester.get("/dashboard/restaurants").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it("GET /restaurants/new should return proper status", (done) => {
    requester.get("/dashboard/restaurants").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it("GET /restaurants/:id should return proper status", (done) => {
    requester.get("/dashboard/restaurants/1").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it("GET /restaurants/:id/edit should return proper status", (done) => {
    requester.get("/dashboard/restaurants/1/edit").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it("POST /restaurants/new adds new record to database", async () => {
    const response = await requester.post("/dashboard/restaurants/new").send({
      name: "New Restaurant",
      address: "New address",
      description: "New description",
      phone: "987654321",
    });
    response.should.have.status(200);
    const newRecord = await Restaurant.findOne({
      where: { phone: "987654321" },
    });
    newRecord.should.be.a("object");
    newRecord.name.should.equal("New Restaurant");
  });

  it("PUT /restaurants/:id should edit a record", async () => {
    const response = await requester
      .put("/dashboard/restaurants/1")
      .send({ name: "Crazy new name" });
    response.should.have.status(200);
    const restaurant_1 = await Restaurant.findByPk(1);
    restaurant_1.name.should.equal("Crazy new name");
  });

  it("DELETE /restaurants/:id should destroy a record", async () => {
    const response = await requester.delete("/dashboard/restaurants/1");
    response.should.have.status(200);
    const restaurant_1 = await Restaurant.findByPk(1);
    (restaurant_1 === null).should.be.true;
  });
});
