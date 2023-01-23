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
    requester = chai.request(app).keepOpen();
  });
  after(() => {
    requester.close();
  });
});
