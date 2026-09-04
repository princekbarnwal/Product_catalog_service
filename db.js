import mongoose from "mongoose";

async function connectdb() {
    try {
        const MONGO_URI = process.env.MONGO_URI||"mongodb://mongo1:27017,mongo2:27017,mongo3:27017/product_catalog_service?replicaSet=rs0"
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("error fetching data:",error);
        process.exit(1);
    }
}

export default connectdb;