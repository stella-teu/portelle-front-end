import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  console.log(" App.jsx is working");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
