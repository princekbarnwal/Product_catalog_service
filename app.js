import "dotenv/config";
import express from "express";
import connectdb from "./db.js";
import product from "./models/product.js";
import Redis from "ioredis";

const app=express();
app.use(express.json());
await connectdb();

const redis = new Redis(process.env.REDIS_URL||"redis://redis:6379");    
    //  environment:
    //   REDIS_URL: redis://redis:6379   if we add this in docker-compose we don't need to use "redis://redis:6379" this explicitly means no || operation

redis.on("connect", ()=>{
    console.log("Redis connected Successfully");
});
redis.on("error", (error)=>{
    console.error("Redis error:", error);
})

app.get('/products',async (req,res)=>{
    try {
        const cacheproducts = await redis.get("products");
        if(cacheproducts){
            console.log("Fetching products from Redis");
            return res.json(JSON.parse(cacheproducts));
        }
        console.log("Fetching products from MongoDB");

        const products = await product.find();
        await redis.set("products",JSON.stringify(products),"EX", 900);

        res.json(products);
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
});

app.get('/products/:id', async (req,res)=>{
    try {
        const foundproduct = await product.findById(req.params.id);
        if(!foundproduct){
            res.status(404).json({error: "Product not found"});
        }
        else{
            res.json(foundproduct);
        }
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
});

app.post('/products',async (req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    try {
        const newproduct = await product.create({
            name: name,
            price: price
        })
        await redis.del("products");
        res.status(201).json(newproduct);
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
})

app.put('/products/:id', async (req,res)=>{
    try {
        const updatedproduct = await product.findByIdAndUpdate(req.params.id,{name: req.body.name, price: req.body.price}, {new: true});
        if(!updatedproduct){
            res.status(404).json({error: "Product not found"})
        }
        else{
            await redis.del("products");
            res.json(updatedproduct);
        }
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
});

app.delete('/products/:id', async (req,res)=>{
    try {
        const deleteproduct = await product.findByIdAndDelete(req.params.id);
        if(!deleteproduct){
            res.status(404).json({error: "Product not found"})
        }
        else{
            await redis.del("products");
            res.status(200).json({message: "Product deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
});

export { redis };
export default app;
