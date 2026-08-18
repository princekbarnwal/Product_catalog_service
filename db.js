import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect("mongodb://mongo1:27017,mongo2:27017,mongo3:27017/product_catalog_service?replicaSet=rs0");
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("error fetching data:",error);
    }
}

export default connectdb;