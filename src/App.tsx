import { Route, Routes } from "react-router";
import "./App.css";
import { Home, Login, Register } from "./components/pages";


function App() {
  return (
    <>
        <div className="contentSpace font-sans">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
