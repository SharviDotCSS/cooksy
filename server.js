// Main entry point of the backend server  
// Sets up Express, middleware, database connection, and API routes  


require("dotenv").config();
const express = require("express");
const connectDB = require('./config/db');
const data = require('./routes/dummyRoutes')

const app = express();
connectDB();

app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("API is running....")
// });

app.get("/api",data);

const PORT = process.env.PORT || 5000;
app.listen (PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})


