import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

import db from "../../src/models/index";

const { User } = db;
chai.should();
chai.use(chaiHttp);

describe("Restaurant unit testing", () => {
  let requester;
  before(() => {
    requester = chai.request.agent(app);
  });
  after(() => {
    requester.close();
  });

  it("GET /auth/login route should work", (done) => {
    requester.get("/auth/login").end((err, res) => {
      res.should.have.status(200);
      res.should.have.cookie("connect.sid");
      done();
    });
  });

  it("GET /auth/register route should work", (done) => {
    requester.get("/auth/register").end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it("POST /auth/register should successfully register user and redirect to /", async () => {
    const response = await requester.post("/auth/register").send({
      name: "Test name",
      email: "test@gmail.com",
      phone: "123123123",
      password: "testpassword",
      confirmpassword: "testpassword",
    });
    response.should.have.status(200);
    response.should.redirectTo(/w*\/$/);
    const newUser = await User.findOne({ where: { email: "test@gmail.com" } });
    (newUser instanceof User).should.be.true;
  });

  it("POST /auth/login should login user and redirect to /dashboard/restaurants", async () => {
    const response = await requester
      .post("/auth/login")
      .send({ email: "test@gmail.com", password: "testpassword" });
    response.should.have.status(200);
    const regex = /w*\/dashboard\/restaurants$/;
    response.should.redirectTo(regex);
  });

  it("POST /auth/logout should successfully logout user and redirect to /", async () => {
    const response = await requester.post("/auth/logout");
    response.should.have.status(200);
    response.should.redirectTo(/w*\/$/);
  });
});
