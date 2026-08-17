import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/product_catalog_service");
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("error fetching data:",error);
    }
}

export default connectdb;