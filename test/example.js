import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index.js";

chai.use(chaiHttp);

describe("Test one", () => {
  describe("should be happy", () => {
    it("something", (done) => {
      chai
        .request(app)
        .get("/dashboard/restaurants")
        .end((err, res) => {
          // console.log("ERR", err);
          // console.log("RES", res);
          done();
        });
    });
  });
});

const { expect } = chai;
// describe("Array", function () {
//   describe("#indexOf()", function () {
//     it("should return -1 when the value is not present", function () {
//       expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
//     });
//   });
// });
