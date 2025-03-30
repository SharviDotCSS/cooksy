import React from "react";
import { ChefHat, Utensils } from "lucide-react"; // Importing icons
import AddRecipeForm from "../components/AddRecipeForm";

const AddRecipe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      {/* Main Container */}
      <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Section - Illustration & Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-500 text-white p-8 w-1/3">
          <ChefHat size={50} className="mb-4" />
          <h2 className="text-xl font-semibold">Create Your Masterpiece</h2>
          <p className="text-center text-sm mt-2">
            Share your recipes with food lovers around the world. Let’s get cooking!
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="p-8 w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-6">
            <Utensils size={28} className="text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Add Your Recipe
            </h1>
          </div>

          <div className="max-h-[80vh] overflow-y-auto"> 
            <AddRecipeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
