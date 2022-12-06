import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ManageExpenses } from "./pages/ManageExpenses";
import { Statistics } from "./pages/Statistics";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ManageExpenses />}></Route>
        <Route path="/stats" element={<Statistics />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
