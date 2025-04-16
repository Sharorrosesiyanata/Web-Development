import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const RecipesPage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRecipes = async () => {
    const res = await axios.get("http://localhost:5000/recipes", { withCredentials: true });
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const createRecipe = async () => {
    await axios.post("http://localhost:5000/recipes", { name, ingredients }, { withCredentials: true });
    setName("");
    setIngredients("");
    fetchRecipes();
  };

  const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
      <textarea placeholder="Dish Name" value={name} onChange={(e) => setName(e.target.value)} className="border w-full p-2 mb-2" />
      <textarea placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="border w-full p-2 mb-2" />
      <button onClick={createRecipe} className="bg-blue-600 text-white px-4 py-2 mb-4 rounded">Add Recipe</button>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="space-y-4">
        {filtered.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} refresh={fetchRecipes} />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
