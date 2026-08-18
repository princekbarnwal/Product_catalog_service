import app from "./app.js";

let port_number=3000;
app.listen(port_number,()=>{
    console.log(`Server is Listening at port ${port_number}`);
})