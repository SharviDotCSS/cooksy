const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Review = require("../models/Review");
const Favorite = require("../models/Favorite");

// Add Dummy Users
router.post("/add-users", async (req, res) => {
    try {
        const users = await User.insertMany([
            { name: "John Doe", email: "john@example.com", password: "123456" },
            { name: "Jane Smith", email: "jane@example.com", password: "password" }
        ]);
        res.json({ message: "Dummy users added!", users });
    } catch (error) {
        res.status(500).json({ message: "Error adding users", error });
    }
});

// Add Dummy Recipes
router.post("/add-recipes", async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) return res.status(400).json({ message: "No users found!" });

        const recipes = await Recipe.insertMany([
            {
                title: "Pasta Carbonara",
                description: "Classic Italian pasta with creamy sauce.",
                ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
                steps: ["Boil pasta", "Cook bacon", "Mix with eggs and cheese"],
                category: "Main Course",
                author: users[0]._id,
            },
            {
                title: "Chocolate Cake",
                description: "Rich and moist chocolate cake.",
                ingredients: ["Flour", "Cocoa", "Sugar", "Eggs"],
                steps: ["Mix ingredients", "Bake at 180°C", "Let it cool"],
                category: "Dessert",
                author: users[1]._id,
            }
        ]);

        res.json({ message: "Dummy recipes added!", recipes });
    } catch (error) {
        res.status(500).json({ message: "Error adding recipes", error });
    }
});

// Add Dummy Reviews
router.post("/add-reviews", async (req, res) => {
    try {
        const users = await User.find();
        const recipes = await Recipe.find();
        if (users.length === 0 || recipes.length === 0)
            return res.status(400).json({ message: "Users or recipes missing!" });

        const reviews = await Review.insertMany([
            { recipe: recipes[0]._id, user: users[1]._id, rating: 5, comment: "Delicious!" },
            { recipe: recipes[1]._id, user: users[0]._id, rating: 4, comment: "Very tasty!" }
        ]);

        res.json({ message: "Dummy reviews added!", reviews });
    } catch (error) {
        res.status(500).json({ message: "Error adding reviews", error });
    }
});

// Add Dummy Favorites
router.post("/add-favorites", async (req, res) => {
    try {
        const users = await User.find();
        const recipes = await Recipe.find();
        if (users.length === 0 || recipes.length === 0)
            return res.status(400).json({ message: "Users or recipes missing!" });

        const favorites = await Favorite.insertMany([
            { user: users[0]._id, recipe: recipes[1]._id },
            { user: users[1]._id, recipe: recipes[0]._id }
        ]);

        res.json({ message: "Dummy favorites added!", favorites });
    } catch (error) {
        res.status(500).json({ message: "Error adding favorites", error });
    }
});

module.exports = router;
