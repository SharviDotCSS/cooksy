import React from "react";
import AddRecipeForm from "../components/AddRecipeForm";

const AddRecipe = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Add Your Delicious Recipe
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Share your favorite recipes with the LoveRecipes community!
        </p>
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipe;