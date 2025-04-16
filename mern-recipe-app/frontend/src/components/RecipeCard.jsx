import { useState } from "react";
import axios from "axios";

const RecipeCard = ({ recipe, refresh }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const update = async () => {
    await axios.put(`http://localhost:5000/recipes/${recipe._id}`, { name, ingredients }, { withCredentials: true });
    setEditing(false);
    refresh();
  };

  const del = async () => {
    await axios.delete(`http://localhost:5000/recipes/${recipe._id}`, { withCredentials: true });
    refresh();
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      {editing ? (
        <>
          <textarea value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 mb-2" />
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="w-full border p-2 mb-2" />
          <button onClick={update} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">Save</button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">{recipe.name}</h2>
          <p>{recipe.ingredients}</p>
        </>
      )}
      <button onClick={() => setEditing(!editing)} className="bg-yellow-500 text-white px-2 py-1 mt-2 mr-2 rounded">
        {editing ? "Cancel" : "Edit"}
      </button>
      <button onClick={del} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Delete</button>
    </div>
  );
};

export default RecipeCard;
