const express=require("express");
const cors=require("cors")
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { weatherRoute } = require("./routes/weatherRoute");
require("dotenv").config();


const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to home page!")
})
app.use("/user",userRoute);
app.use("/weather",weatherRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DB");
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log("Not able to connected to DB");
        console.log(error);
    }
})