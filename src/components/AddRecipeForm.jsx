import React, { useState } from "react";
import { Plus, X, Image, Clock, Users } from "lucide-react"; // Importing Lucide icons

const AddRecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [""],
    directions: [""],
    prepTime: "",
    servings: "",
    tags: [""],
    image: null,
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...recipe[field]];
    newArray[index] = value;
    setRecipe({ ...recipe, [field]: newArray });
  };

  const addArrayField = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ""] });
  };

  const removeArrayField = (index, field) => {
    const newArray = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: newArray });
  };

  const handleImageUpload = (e) => {
    setRecipe({ ...recipe, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe submitted:", recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Add Your Recipe</h2>
      <p className="text-gray-600 mb-4">Share your delicious creations with the world!</p>

      {/* Recipe Title */}
      <label className="block text-gray-700 font-medium mb-1">Recipe Title</label>
      <input type="text" name="title" value={recipe.title} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Enter recipe title" />

      {/* Description */}
      <label className="block text-gray-700 font-medium mt-4">Description</label>
      <textarea name="description" value={recipe.description} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Describe your recipe"></textarea>

      {/* Ingredients */}
      <label className="block text-gray-700 font-medium mt-4">Ingredients</label>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={ingredient} onChange={(e) => handleArrayChange(index, "ingredients", e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Enter ingredient" />
          <button type="button" onClick={() => removeArrayField(index, "ingredients")} className="text-red-500 hover:bg-red-100 p-2 rounded-lg">
            <X size={20} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("ingredients")} className="flex items-center gap-2 text-green-500 mt-2">
        <Plus size={18} /> Add Ingredient
      </button>

      {/* Directions */}
      <label className="block text-gray-700 font-medium mt-4">Directions</label>
      {recipe.directions.map((step, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={step} onChange={(e) => handleArrayChange(index, "directions", e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Enter step" />
          <button type="button" onClick={() => removeArrayField(index, "directions")} className="text-black-500 hover:bg-red-100 p-2 rounded-lg">
            <X size={20} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("directions")} className="flex items-center gap-2 text-black-500 mt-2">
        <Plus size={18} /> Add Step
      </button>

      {/* Prep Time */}
      <label className=" text-gray-700 font-medium mt-4 flex items-center gap-2">
        <Clock size={18} /> Preparation Time (in mins)
      </label>
      <input type="text" name="prepTime" value={recipe.prepTime} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="e.g., 30" />

      {/* Servings */}
      <label className=" text-gray-700 font-medium mt-4 flex items-center gap-2">
        <Users size={18} /> Servings
      </label>
      <input type="text" name="servings" value={recipe.servings} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="e.g., 4 people" />

      {/* Tags */}
      <label className="block text-gray-700 font-medium mt-4">Tags</label>
      {recipe.tags.map((tag, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={tag} onChange={(e) => handleArrayChange(index, "tags", e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="e.g., Vegetarian" />
          <button type="button" onClick={() => removeArrayField(index, "tags")} className="text-black-500 hover:bg-red-100 p-2 rounded-lg">
            <X size={20} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("tags")} className="flex items-center gap-2 text-black-500 mt-2">
        <Plus size={18} /> Add Tag
      </button>

      {/* Image Upload */}
      <label className=" text-gray-700 font-medium mt-4 flex items-center gap-2">
        <Image size={18} /> Add Image
      </label>
      <input type="file" onChange={handleImageUpload} className="w-full p-3 border rounded-lg" />
      {recipe.image && <img src={recipe.image} alt="Recipe" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />}

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit Recipe</button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
