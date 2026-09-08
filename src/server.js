import "dotenv/config";
import connectdb from "./config/db.js";
import app from "./app.js";

await connectdb();

let port_number=process.env.PORT || 3000;
app.listen(port_number,()=>{
    console.log(`Server is Listening at port ${port_number}`);
})