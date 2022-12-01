import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ManageExpenses } from "./pages/ManageExpenses";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ManageExpenses />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
