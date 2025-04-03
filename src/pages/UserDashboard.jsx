import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-bold">Please Log In</h1>
          <p className="text-lg mt-2 text-red-500">
            You need to log in to view your profile.
          </p>
        </main>
      </div>
    );
  }

  // Fetch User's Uploaded Recipes
  useEffect(() => {
    const fetchUploadedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");

        const formattedRecipes = response.data.map((recipe) => ({
          _id: recipe._id,
          img: recipe.image,
          title: recipe.title,
          authorId: recipe.author?._id,
          author: recipe.author?.name ?? "Unknown",
          tag:
            typeof recipe.tag === "string"
              ? recipe.tag.split(",").map((t) => t.trim())
              : Array.isArray(recipe.tag)
              ? recipe.tag
              : [],
          rating: recipe.rating ?? "N/A",
          description: recipe.description ?? "No description available.",
          prepTime:
            recipe.preparationTime !== undefined
              ? `${recipe.preparationTime} mins`
              : "Unknown",
          servings: recipe.servings ?? "Unknown",
          ingredients: Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [],
          directions: Array.isArray(recipe.directions) ? recipe.directions : [],
        }));

        const userRecipes = formattedRecipes.filter(
          (recipe) => recipe.authorId === userId
        );
        setUploadedRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedRecipes();
  }, [userId]);

  // Fetch Saved Recipes
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!token) {
        console.error("No auth token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Saved Recipes Response:", response.data);

        const formattedSavedRecipes = response.data
          .filter((fav) => fav.recipe)
          .map((fav) => ({
            _id: fav.recipe._id,
            img: fav.recipe.image,
            title: fav.recipe.title,
            authorId: fav.recipe.author?._id,
            author: fav.recipe.author?.name ?? "Unknown",
            tag:
              typeof fav.recipe.tag === "string"
                ? fav.recipe.tag.split(",").map((t) => t.trim())
                : Array.isArray(fav.recipe.tag)
                ? fav.recipe.tag
                : [],
            rating: fav.recipe.rating ?? "N/A",
            description: fav.recipe.description ?? "No description available.",
            prepTime:
              fav.recipe.preparationTime !== undefined
                ? `${fav.recipe.preparationTime} mins`
                : "Unknown",
            servings: fav.recipe.servings ?? "Unknown",
            ingredients: Array.isArray(fav.recipe.ingredients)
              ? fav.recipe.ingredients
              : [],
            directions: Array.isArray(fav.recipe.directions)
              ? fav.recipe.directions
              : [],
          }));

        setSavedRecipes(formattedSavedRecipes);
      } catch (error) {
        console.error(
          "Error fetching saved recipes:",
          error.response?.data || error.message
        );
      }
    };

    fetchSavedRecipes();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-lg mt-2">Manage your recipes and saved collections.</p>
        </div>

        {/* Uploaded Recipes Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : uploadedRecipes.length > 0 ? (
              uploadedRecipes.map((recipe) => (
                <Link to={`/recipe/${recipe._id}`} state={{ recipe }} key={recipe._id}>
                  <RecipeCard recipe={recipe} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">You haven't uploaded any recipes yet.</p>
            )}
          </div>
        </section>

        {/* Saved Recipes Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => (
                <Link to={`/recipe/${recipe._id}`} state={{ recipe }} key={recipe._id}>
                  <RecipeCard recipe={recipe} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">You haven't saved any recipes yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;







// Static
// import React from "react";
// import { Bookmark, PlusCircle, Home, User, LogOut } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import RecipeCard from "../components/RecipeCard";

// const uploadedRecipes = [
//   {
//     id: 1,
//     title: "Spaghetti Carbonara",
//     img: "https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Chef Alex",
//     tags: ["Italian", "Pasta"],
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     title: "Classic Pancakes",
//     img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
//     author: "Sarah's Kitchen",
//     tags: ["Breakfast", "Sweet"],
//     rating: 4.7,
//   },
// ];

// const savedRecipes = [
//   {
//     id: 3,
//     title: "Spaghetti Carbonara",
//     img: "https://images.pexels.com/photos/4057736/pexels-photo-4057736.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//     author: "Chef Alex",
//     tags: ["Italian", "Pasta"],
//     rating: 4.8,
//   },
//   {
//     id: 4,
//     title: "Classic Pancakes",
//     img: "https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Sarah's Kitchen",
//     tags: ["Breakfast", "Sweet"],
//     rating: 4.7,
//   },
// ];

// const UserDashboard = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar /> 
//       <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-6">
//         <div className="bg-[url('https://source.unsplash.com/300x200/?pancakes">
//           <h1 className="text-3xl font-bold">Welcome!</h1>
//           <p className="text-lg mt-2">Manage your recipes and saved collections.</p>
//         </div>
//         <section className="mt-10">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {uploadedRecipes.length > 0 ? (
//               uploadedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
//             ) : (
//               <p className="text-gray-500">You haven't uploaded any recipes yet.</p>
//             )}
//           </div>
//         </section>
//         <section className="mt-10">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Recipes</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {savedRecipes.length > 0 ? (
//               savedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
//             ) : (
//               <p className="text-gray-500">No saved recipes yet.</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// // // Recipe Card Component
// // const RecipeCard = ({ recipe }) => {
// //   return (
// //     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
// //       <img src={recipe.img} alt={recipe.title} className="w-full h-40 object-cover" />
// //       <div className="p-4">
// //         <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
// //         <p className="text-yellow-500 font-semibold">⭐ {recipe.rating}</p>
// //         <button className="mt-3 flex items-center gap-2 text-blue-500 hover:underline">
// //           <Bookmark size={18} /> Save Recipe
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// export default UserDashboard;
