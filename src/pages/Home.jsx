import React from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";
//title, description, ingredients, steps,img, category, author, created at, 

const recipes = [
  {
    id: 1,
    title: "Homemade Margherita Pizza",
    img: "https://images.pexels.com/photos/6147826/pexels-photo-6147826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Chef Ranveer Brar",
    tags: ["Italian", "Pizza"],
    rating: 4.8,
  },
  {
    id: 2,
    title: "Classic Pancakes",
    img: "https://source.unsplash.com/300x200/?pancakes",
    author: "Chef Vikas Khanna",
    tags: ["Breakfast", "Sweet"],
    rating: 4.7,
  },
  {
    id: 3,
    title: "Chocolate Cake",
    img: "https://source.unsplash.com/300x200/?chicken",
    author: "Chef Pooja Dhingra",
    tags: ["Healthy", "Protein"],
    rating: 4.5,
  },
  {
    id: 4,
    title: "Vegan Salad",
    img: "https://source.unsplash.com/300x200/?salad",
    author: "Sarah's Kitchen",
    tags: ["Vegan", "Healthy"],
    rating: 4.6,
  },
  {
    id: 5,
    title: "Grilled Chicken",
    img: "https://source.unsplash.com/300x200/?chocolate-cake",
    author: "Baker's Delight",
    tags: ["Dessert", "Chocolate"],
    rating: 4.9,
  },
  {
    id: 6,
    title: "Tandoori Chicken",
    img: "https://source.unsplash.com/300x200/?tandoori-chicken",
    author: "Indian Spices",
    tags: ["Indian", "Spicy"],
    rating: 4.7,
  },
];

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search recipes..."
              className="border rounded-lg px-3 py-2 pl-10 w-full md:w-1/2"
            />
            <Search className="absolute left-3 top-2 text-gray-500" size={18} />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                Meal Type <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mb-10">
          <div className="bg-[url('https://images.pexels.com/photos/9004736/pexels-photo-9004736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center text-white rounded-lg p-10 md:p-16 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Discover & Share Amazing Recipes</h1>
            <p className="text-lg mb-6">Join our community of food lovers and explore a world of flavors.</p>
            <Link to="/add-recipe">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg text-lg font-semibold">
                Share Your Recipe
              </button>
            </Link>
          </div>
        </section>

        {/* Discover Recipes */}
        <h2 className="text-2xl font-semibold mb-4">Discover Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="block">
              <RecipeCard recipe={recipe} />
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;
