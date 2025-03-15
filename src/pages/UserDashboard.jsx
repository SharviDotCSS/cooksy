import React from "react";
import { Bookmark, PlusCircle, Home, User, LogOut } from "lucide-react";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";

const uploadedRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    img: "https://source.unsplash.com/300x200/?pasta",
    author: "Chef Alex",
    tags: ["Italian", "Pasta"],
    rating: 4.8,
  },
  {
    id: 2,
    title: "Classic Pancakes",
    img: "https://source.unsplash.com/300x200/?pancakes",
    author: "Sarah's Kitchen",
    tags: ["Breakfast", "Sweet"],
    rating: 4.7,
  },
];

const savedRecipes = [
  {
    id: 3,
    title: "Spaghetti Carbonara",
    img: "https://source.unsplash.com/300x200/?pasta",
    author: "Chef Alex",
    tags: ["Italian", "Pasta"],
    rating: 4.8,
  },
  {
    id: 4,
    title: "Classic Pancakes",
    img: "https://source.unsplash.com/300x200/?pancakes",
    author: "Sarah's Kitchen",
    tags: ["Breakfast", "Sweet"],
    rating: 4.7,
  },
];

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> 
      <main className="flex-1 p-8">
        <div className="bg-[url('https://source.unsplash.com/300x200/?pancakes">
          <h1 className="text-3xl font-bold">Welcome, User!</h1>
          <p className="text-lg mt-2">Manage your recipes and saved collections.</p>
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadedRecipes.length > 0 ? (
              uploadedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <p className="text-gray-500">You haven't uploaded any recipes yet.</p>
            )}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <p className="text-gray-500">No saved recipes yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// // Recipe Card Component
// const RecipeCard = ({ recipe }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
//       <img src={recipe.img} alt={recipe.title} className="w-full h-40 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
//         <p className="text-yellow-500 font-semibold">⭐ {recipe.rating}</p>
//         <button className="mt-3 flex items-center gap-2 text-blue-500 hover:underline">
//           <Bookmark size={18} /> Save Recipe
//         </button>
//       </div>
//     </div>
//   );
// };

export default UserDashboard;
