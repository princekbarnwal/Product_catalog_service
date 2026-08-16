import express from "express";
import { error } from "node:console";

const app=express();
app.use(express.json());

const arr=[{id: 1, name: "rabdi", price: 20},
        {id: 2, name: "jalebi", price: 10}
    ];

app.get('/products',(req,res)=>{
    res.json(arr);
})

app.get('/products/:id',(req,res)=>{
    const id=req.params.id;
    const product=arr.find((product)=>{
        return product.id==id;
    })
    if(product)
        res.json(product);
    else
        res.status(404).json("Product not found");
})

app.post('/products',(req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    let maxid=arr[0].id;
    for(let i=0;i<arr.length;i++){
        maxid=Math.max(maxid,arr[i].id);
    }
    const newid=maxid+1;
    const newproduct = {id: newid, name: name, price: price};
    arr.push(newproduct);
    res.status(201).json(newproduct);
})

app.put('/products/:id',(req,res)=>{
    const id=req.params.id;
    const product=arr.find((product)=>{
        return product.id==id;
    })
    if(!product){
        res.status(404).json({error:"Product not found"});
    }
    else{
        product.name=req.body.name;
        product.price=req.body.price;
        res.status(200).json(product);
    }
})

app.delete('/products/:id',(req,res)=>{
    const id=req.params.id;
    const index=arr.findIndex((product)=>{
        return product.id==id;
    })
    if(index===-1){
        res.status(404).json({error:"Product not found"});
    }
    else{
        arr.splice(index,1);
        res.json({message: "Product deleted Successfully"});
    }
})

let port_number=3000;
app.listen(port_number,()=>{
    console.log(`Server is Listening at port ${port_number}`);
})
