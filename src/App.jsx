import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Update } from "./pages/Update";

function App() {
  return (
    <div className="bg-gray-800 h-screen text-white p-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
