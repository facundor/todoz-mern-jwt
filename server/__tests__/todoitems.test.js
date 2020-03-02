require("dotenv").config({ path: "test.env" });
const request = require("supertest");
const server = require("../config/server");
const { resetDB } = require("../config/db");
const { login } = require("../helpers/tests");

jest.mock("../config/db");

describe("Todoitems", () => {
  afterEach(() => {
    resetDB();
  });

  test("POST", async done => {
    // Login
    const token = await login(server);

    // Missing data
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        done: true
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    // Post ok. Done defaults in true
    const description1 = "Test task 1"
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        description: description1
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).not.toBeNull();
        expect(res.body.done).toBe(false);
        expect(res.body.timestamp).not.toBeNull();
        expect(res.body.description).toBe(description1);
      }); 
    // Post ok
    const done2 = true;
    const description2 = "Test task 2";
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        done: done2,
        description: description2
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).not.toBeNull();
        expect(res.body.done).toBe(done2);
        expect(res.body.timestamp).not.toBeNull();
        expect(res.body.description).toBe(description2);
        done();
      });
  });

  test("GET", async done => {
    // Login
    const token = await login(server);
 
    // Post ok
    const _done = true;
    const _description = "Test task 2";
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        done: _done,
        description: _description
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    await request(server)
    .get("/api/todoitems")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(1);
      expect(res.body.some(({description, done}) => description === _description && done === _done)).toBe(true);
      done();
    });
      
  });

  test("DELETE", async done => {
    // Login
    const token = await login(server);
 
    // Post ok
    const _done = true;
    const _description = "Test task";
    let _id = null;
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        done: _done,
        description: _description
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    await request(server)
    .get("/api/todoitems")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(1);
      _id = res.body[0].id;
    });

    await request(server)
    .delete("/api/todoitems/" + _id)
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.id).toBe(_id);
    });

    await request(server)
    .get("/api/todoitems")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(0);
      done();
    });
      
  });

  test("PUT", async done => {
    // Login
    const token = await login(server);
 
    // Post ok
    const _done = true;
    const _description = "Test task";
    let _id = null;
    await request(server)
      .post("/api/todoitems")
      .set("Authorization", "Bearer " + token)
      .send({
        done: _done,
        description: _description
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    await request(server)
    .get("/api/todoitems")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(1);
      _id = res.body[0].id;
      expect(res.body[0].description).toBe(_description);
    });

    const modifiedDescription = "Modified task";
    await request(server)
    .patch("/api/todoitems/")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .send({
      id: _id,
      description: modifiedDescription
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.id).toBe(_id);
    });

    await request(server)
    .get("/api/todoitems")
    .set("Authorization", "Bearer " + token)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(1);
      _id = res.body[0].id;
      expect(res.body[0].description).toBe(modifiedDescription);
      done();
    });
      
  });


});
