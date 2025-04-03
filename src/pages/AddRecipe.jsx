import React from "react";
import { Utensils } from "lucide-react"; // Importing icons
import AddRecipeForm from "../components/AddRecipeForm";
import Sidebar from "../components/Sidebar";

const AddRecipe = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar (Fixed on Left) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-8">  {/* Increased max width */}
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Utensils size={28} className="text-green-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Add Your Recipe</h1>
                <p className="text-gray-600">Share your delicious creations with the world!</p>
              </div>
            </div>
          </div>
          {/* Recipe Form */}
          <div className="max-h-[80vh] overflow-y-auto w-full px-4">  {/* Added padding for better spacing */}
            <AddRecipeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
