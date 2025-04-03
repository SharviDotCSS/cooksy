import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, ShoppingCart, ChefHat, Clock, UtensilsCrossed, Star } from "lucide-react";
import FeedbackForm from "../components/FeedbackForm";
import axios from "axios";

const RecipeInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const recipe = location.state?.recipe;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (recipe?._id) {  // ✅ Use recipe._id instead of recipeId
                try {
                    const response = await axios.get(`http://localhost:3000/api/reviews/${recipe._id}`);
                    setReviews(Array.isArray(response.data) ? response.data : []); // ✅ Ensure it's an array
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                    setReviews([]); // ✅ Fallback to empty array on error
                }
            }
        };
    
        fetchReviews();
    }, [recipe]); // ✅ Keep dependency array correct
    
    

    if (!recipe) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-700">
                <p>Recipe not found. Please go back and select a recipe.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:block w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto h-screen p-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                {/* Recipe Image */}
                <div className="bg-white shadow-lg rounded-lg min-h-[200px] w-full">
                    <img src={recipe.img || recipe.image} alt={recipe.title} className="w-full h-54 object-cover rounded-lg" />
                </div>

                {/* Recipe Details */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
                    <p className="text-gray-600 mt-2">{recipe.description}</p>

                    {/* Tags */}
                    {recipe.tags?.length > 0 && (
                        <div className="flex gap-2 mt-3">
                            {recipe.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Prep Time & Servings */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <Clock size={20} /> Prep Time
                            </h4>
                            <p className="text-gray-600">{recipe.prepTime} mins</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <UtensilsCrossed size={20} /> Servings
                            </h4>
                            <p className="text-gray-600">{recipe.servings}</p>
                        </div>
                    </div>

                    {/* Ingredients */}
                    {recipe.ingredients?.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <ShoppingCart size={24} /> Ingredients
                            </h2>
                            <ul className="list-disc list-inside mt-2 text-gray-600">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Directions */}
                    {recipe.directions?.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <ChefHat size={24} /> Directions
                            </h2>
                            <ol className="list-decimal list-inside mt-2 text-gray-600">
                                {recipe.directions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>

                {/* Feedback Form */}
                <FeedbackForm recipeId={recipe._id} />

                {/* Reviews Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <Star size={24} className="text-yellow-500" /> Reviews
                    </h2>

                    {reviews.length > 0 ? (
                        <div className="mt-4 space-y-4">
                            {reviews.map((review, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-800 font-semibold">{review.user.name}</p>
                                        <div className="flex items-center text-yellow-500">
                                            {Array(review.rating).fill().map((_, i) => (
                                                <Star key={i} size={16} className="fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-1">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeInfo;




// Static
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { ArrowLeft, ShoppingCart, ChefHat, Clock, UtensilsCrossed } from "lucide-react";
// import FeedbackForm from "../components/FeedbackForm";

// const RecipeInfo = () => {
//     const navigate = useNavigate();
//     const recipe = {
//         title: "Homemade Margherita Pizza",
//         image: "https://images.pexels.com/photos/6147826/pexels-photo-6147826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         description: "A delicious homemade Margherita pizza with fresh ingredients.",
//         ingredients: [
//             "2 cups all-purpose flour",
//             "1 tsp salt",
//             "1 cup water",
//             "1 tsp olive oil",
//             "1/2 cup tomato sauce",
//             "1 cup mozzarella cheese",
//             "Fresh basil leaves",
//         ],
//         directions: [
//             "Preheat oven to 220°C (430°F).",
//             "Mix flour, salt, water, and oil to form dough.",
//             "Roll out the dough and spread tomato sauce.",
//             "Sprinkle mozzarella cheese and add fresh basil.",
//             "Bake for 12-15 minutes until golden brown.",
//             "Slice and serve hot.",
//         ],
//         prepTime: 20,
//         servings: 2,
//         tags: ["Italian", "Pizza", "Vegetarian"],
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar - Fixed Position */}
//             <div className="hidden md:block w-64">
//                 <Sidebar />
//             </div>

//             {/* Main Content - Scrollable */}
//             <div className="flex-1 flex flex-col overflow-auto h-screen p-8">
//                 {/* Back Button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
//                 >
//                     <ArrowLeft size={20} />
//                     Back
//                 </button>

//                 {/* Recipe Image */}
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                     <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
//                 </div>

//                 {/* Recipe Details */}
//                 <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
//                     <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
//                     <p className="text-gray-600 mt-2">{recipe.description}</p>

//                     {/* Tags */}
//                     <div className="flex gap-2 mt-3">
//                         {recipe.tags.map((tag, index) => (
//                             <span key={index} className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
//                                 {tag}
//                             </span>
//                         ))}
//                     </div>

//                     {/* Prep Time & Servings */}
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//                         <div className="p-4 bg-gray-100 rounded-lg">
//                             <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//                                 <Clock size={20} /> Prep Time
//                             </h4>
//                             <p className="text-gray-600">{recipe.prepTime} mins</p>
//                         </div>
//                         <div className="p-4 bg-gray-100 rounded-lg">
//                             <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//                                 <UtensilsCrossed size={20} /> Servings
//                             </h4>
//                             <p className="text-gray-600">{recipe.servings}</p>
//                         </div>
//                     </div>

//                     {/* Ingredients */}
//                     <div className="mt-6">
//                         <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                             <ShoppingCart size={24} /> Ingredients
//                         </h2>
//                         <ul className="list-disc list-inside mt-2 text-gray-600">
//                             {recipe.ingredients.map((ingredient, index) => (
//                                 <li key={index}>{ingredient}</li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Directions */}
//                     <div className="mt-6">
//                         <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                             <ChefHat size={24} /> Directions
//                         </h2>
//                         <ol className="list-decimal list-inside mt-2 text-gray-600">
//                             {recipe.directions.map((step, index) => (
//                                 <li key={index}>{step}</li>
//                             ))}
//                         </ol>
//                     </div>
//                 </div>

//                 {/* Feedback Form */}
//                 <FeedbackForm />
//             </div>
//         </div>
//     );
// };

// export default RecipeInfo;
