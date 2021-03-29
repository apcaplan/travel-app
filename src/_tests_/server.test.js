import "@babel/polyfill";
const app = require("../server/server";
const supertest = require("supertest");
const request = supertest(app);

describe("test endpoints", () => {
  it("returns html file", async (done) => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    done();
  });
});
