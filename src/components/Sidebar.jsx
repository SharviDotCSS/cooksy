import React from "react";
import { Link } from "react-router-dom";
import { Home, Bookmark, PlusCircle, User, Utensils, LogIn } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-green-700 text-white p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Cooksy</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg">
            <Home size={20} /> Home
          </Link>
          <Link to="/add-recipe" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg">
            <PlusCircle size={20} /> Add Recipe
          </Link>
          {/* <Link to="/saved-recipes" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg">
            <Bookmark size={20} /> Saved Recipes
          </Link>
          <Link to="/my-recipes" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg">
            <Utensils size={20} /> My Recipes
          </Link> */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg">
            <User size={20} /> Profile
          </Link>
        </nav>
      </div>

      {/* Bottom Section (Login Button) */}
      <div className="mt-auto">
        <Link
          to="/login"
          className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-lg"
        >
          <LogIn size={20} /> Login
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
