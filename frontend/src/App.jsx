import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
// import SearchRecipe from "./pages/SearchRecipe";
import Login from "./pages/Login";
import Signin from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
// import Admin from "./pages/Admin";
import RecipeInfo from "./pages/RecipeInfo";
import Signup from "./pages/Signup";

const BASE_ROUTE = import.meta.env.VITE_BASE_ROUTE || "/";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${BASE_ROUTE}`} element={<Home />} />
        <Route path={`${BASE_ROUTE}/add-recipe`} element={<AddRecipe />} />
        {/* <Route path={`${BASE_ROUTE}/search`} element={<SearchRecipe />} /> */}
        <Route path={`${BASE_ROUTE}/login`} element={<Login />} />
        <Route path={`${BASE_ROUTE}/signin`} element={<Signin />} />
        <Route path={`${BASE_ROUTE}/dashboard`} element={<UserDashboard />} />
        {/* <Route path={`${BASE_ROUTE}/admin`} element={<Admin />} /> */}
        <Route path={`${BASE_ROUTE}/recipe/:id`} element={<RecipeInfo />} />
        <Route path={`${BASE_ROUTE}/register`} element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
