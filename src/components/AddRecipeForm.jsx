import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-black-500 mb-2">Add Your Recipe</h2>
      <p className="text-gray-600 mb-4">Adding your personal recipes is easy.</p>
      
      <label className="block mb-2">Recipe Title</label>
      <input type="text" name="title" value={recipe.title} onChange={handleChange} className="w-full p-2 border rounded" />
      
      <label className="block mt-4">Description</label>
      <textarea name="description" value={recipe.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
      
      <label className="block mt-4">Ingredients</label>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={ingredient} onChange={(e) => handleArrayChange(index, "ingredients", e.target.value)} className="w-full p-2 border rounded" />
          <button type="button" onClick={() => removeArrayField(index, "ingredients")} className="text-red-500">X</button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("ingredients")} className="text-blue-500">+ Add Ingredient</button>
      
      <label className="block mt-4">Directions</label>
      {recipe.directions.map((step, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={step} onChange={(e) => handleArrayChange(index, "directions", e.target.value)} className="w-full p-2 border rounded" />
          <button type="button" onClick={() => removeArrayField(index, "directions")} className="text-red-500">X</button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("directions")} className="text-blue-500">+ Add Step</button>
      
      <label className="block mt-4">Preparation Time (in mins)</label>
      <input type="text" name="prepTime" value={recipe.prepTime} onChange={handleChange} className="w-full p-2 border rounded" />
      
      <label className="block mt-4">Servings</label>
      <input type="text" name="servings" value={recipe.servings} onChange={handleChange} className="w-full p-2 border rounded" />
      
      <label className="block mt-4">Tags</label>
      {recipe.tags.map((tag, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input type="text" value={tag} onChange={(e) => handleArrayChange(index, "tags", e.target.value)} className="w-full p-2 border rounded" />
          <button type="button" onClick={() => removeArrayField(index, "tags")} className="text-red-500">X</button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("tags")} className="text-blue-500">+ Add Tag</button>
      
      <label className="block mt-4">Add Image</label>
      <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />
      {recipe.image && <img src={recipe.image} alt="Recipe" className="mt-2 w-32 h-32 object-cover" />}
      
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Submit Recipe</button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
