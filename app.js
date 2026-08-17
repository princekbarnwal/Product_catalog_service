import express from "express";
import connectdb from "./db.js";
import product from "./models/product.js";

const app=express();
app.use(express.json());
connectdb();

const arr=[{id: 1, name: "rabdi", price: 20},
        {id: 2, name: "jalebi", price: 10}
    ];

app.get('/products',async (req,res)=>{
    try {
        const products = await product.find();
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
            res.status(200).json({message: "Product deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error: "Server Unavailable"});
    }
});

let port_number=3000;
app.listen(port_number,()=>{
    console.log(`Server is Listening at port ${port_number}`);
})
