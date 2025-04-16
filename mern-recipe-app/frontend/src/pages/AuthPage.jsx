import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:5000/auth/register", { name, password }, { withCredentials: true });
    navigate("/recipes");
  };

  const login = async () => {
    await axios.post("http://localhost:5000/auth/login", { name, password }, { withCredentials: true });
    navigate("/recipes");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <textarea placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
      <textarea placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <div className="flex gap-2">
        <button onClick={register} className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        <button onClick={login} className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
      </div>
    </div>
  );
};

export default AuthPage;
