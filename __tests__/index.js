const superTest = require("supertest");
const server = require("../server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyUm9sZSI6ImJhc2ljIiwiaWF0IjoxNjAzMjM1Njc0fQ.Gst6wbnUpRJP8ZQ6sBNbJOXmmTJZT70sZrXKnXbYFmM";
const auth = "Authorization";

describe("GET Requests for Users & Airbnb endpoints", () => {
  test("GET /api/users", async () => {
    const res = await superTest(server).get("/api/users").set(auth, token);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });

  test("GET /api/airbnb", async () => {
    const res = await superTest(server).get("/api/airbnb").set(auth, token);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("GET Users by ID", async () => {
    const res = await superTest(server).get("/api/users/1").set(auth, token);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });

  test("GET Airbnb by ID", async () => {
    const res = await superTest(server).get("/api/airbnb/6").set(auth, token);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });

  test("GET checks to see if user exists", async () => {
    const res = await superTest(server).get("/api/users/9").set(auth, token);
    expect(res.statusCode).toBe(401);
    expect(res.type).toEqual("application/json");
  });

  test("GET checks to see if airbnb exists", async () => {
    const res = await superTest(server).get("/api/airbnb/1").set(auth, token);
    expect(res.statusCode).toBe(401);
    expect(res.type).toEqual("application/json");
  });

  test("GET a list of a users hosted houses", async () => {
    const res = await superTest(server)
      .get("/api/users/2/housing")
      .set(auth, token);
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual("application/json");
  });
});

describe("Testing POST endpoints", () => {
  test("New user Registration", async () => {
    const res = await superTest(server).post("/api/users/register").send({
      username: "alextest5",
      password: "alex",
    });
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual("application/json");
  });

  test("User Logging in", async () => {
    const res = await superTest(server).post("/api/users/login").send({
      username: "testingapi",
      password: "testingapi",
    });
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });

  test("Adding a home to the user", async () => {
    const res = await superTest(server)
      .post("/api/users/2/housing")
      .set(auth, token)
      .send({
        country: "Canada",
        city: "Torronto",
        home_type: "apartment",
        rooms: 2,
        min_nights: 5,
      });
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual("application/json");
  });
});

describe("Testing PUT endpoint", () => {
  test("Testing the edit put request on housing", async () => {
    const res = await superTest(server)
      .put("/api/airbnb/6")
      .set(auth, token)
      .send({
        country: "Japan",
        city: "Tokyo",
        home_type: "apartment",
        rooms: 2,
        min_nights: 5,
      });
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual("application/json");
  });
});

describe("Testing DELETE endpoint", () => {
  test("Testing the delete request on housing", async () => {
    const res = await superTest(server)
      .delete("/api/airbnb/3")
      .set(auth, token);
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual("application/json");
  });
});
