// Defines the User schema for MongoDB  
// Includes fields like name, email, password, and timestamps  

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type: String,
         default: ""
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

mongoose.model("User",userSchema);
