const superTest = require("supertest");
const server = require("../server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyUm9sZSI6ImJhc2ljIiwiaWF0IjoxNjAzMjM1Njc0fQ.Gst6wbnUpRJP8ZQ6sBNbJOXmmTJZT70sZrXKnXbYFmM";

describe("GET Requests for Users & Airbnb endpoints", () => {
  test("GET /api/users", async () => {
    const res = await superTest(server)
      .get("/api/users")
      .set("Authorization", token);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });

  //   test("GET /api/airbnb", async () => {
  //     const res = await superTest(server).get("/api/airbnb");
  //     expect(res.statusCode).toBe(200);
  //     expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  //   });
});
