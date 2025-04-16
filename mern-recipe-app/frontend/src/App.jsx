import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RecipesPage from "./pages/RecipesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
