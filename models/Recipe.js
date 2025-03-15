// Defines the Recipe schema for MongoDB  
// Includes fields like title, ingredients, instructions, images, and user reference  

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
   directions: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        default: ""
    }, //preparation time,servings
    tag: {
        type: String,
        required: true
    }, // e.g, Dessert, Main Course, starter,etc
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, // Reference to User
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);
