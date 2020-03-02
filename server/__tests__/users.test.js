require("dotenv").config({ path: "test.env" });
const request = require("supertest");
const server = require("../config/server");
const { resetDB } = require("../config/db");

jest.mock("../config/db");

describe("Users", () => {
  afterEach(() => {
    resetDB();
  });

  test("POST", async done => {
    // Missing data
    await request(server)
      .post("/api/users")
      .send({
        lastName: "Smith",
        email: "john.smith@gmail.com",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    await request(server)
      .post("/api/users")
      .send({
        firstName: "John",
        email: "john.smith@gmail.com",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    await request(server)
      .post("/api/users")
      .send({
        firstName: "John",
        lastName: "Smith",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    await request(server)
      .post("/api/users")
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@gmail.com"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    // Post ok
    await request(server)
      .post("/api/users")
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@gmail.com",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).not.toBeNull();
        expect(res.body).toMatchObject({});
        done();
      });
  });

  test("POST", async done => {
    // Add two users
    await request(server)
      .post("/api/users")
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@gmail.com",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
      await request(server)
      .post("/api/users")
      .send({
        firstName: "Bill",
        lastName: "Williams",
        email: "bill.williams@gmail.com",
        password: "123456"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
      // Get
      await request(server)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect(200)
      .then(res => {
        expect(res.body).not.toBeNull();
        expect(res.body.length).toBe(2);
        expect(res.body.some(({email}) => email === "john.smith@gmail.com")).toBe(true);
        expect(res.body.some(({email}) => email === "bill.williams@gmail.com")).toBe(true);
        done();
      });
  });
});
