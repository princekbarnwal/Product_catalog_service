import request from "supertest"; 
import app from "./app.js";

test('GET /products should return 200', async () => { 
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
 },15000);

test('Full CRUD flow: create, update, delete a product', async () => { 

    // 1. POST - create
    const postresponse = await request(app).post("/products").send({name:"test", price:10});
    expect(postresponse.status).toBe(201);
    const id=postresponse.body._id

    // 2. PUT - update using id
    const putresponse = await request(app).put(`/products/${id}`).send({name:"updatetest", price:20})
    expect(putresponse.status).toBe(200);

    // 3. DELETE - remove using id
    const deleteresponse = await request(app).delete(`/products/${id}`)
    expect(deleteresponse.status).toBe(200);

    // 4. GET - confirm it's gone
    const getresponse = await request(app).get(`/products/${id}`);
    expect(getresponse.status).toBe(404);

 },20000);

 