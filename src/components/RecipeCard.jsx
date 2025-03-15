import React from "react";
import { Star } from "lucide-react";

const RecipeCard = ({ recipe = {} }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={recipe.img} alt={recipe.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">By {recipe.author}</p>
        <div className="flex gap-2 mt-2">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mt-3">
          <Star className="text-yellow-500" size={16} />
          <span className="ml-1 text-gray-700">{recipe.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
