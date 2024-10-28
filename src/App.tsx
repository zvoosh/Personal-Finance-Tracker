import { Route, Routes } from "react-router";
import "./App.css";
import { Home, Login, Register } from "./components/pages";
import { ExpenseProvider } from "./components";

function App() {
  return (
    <>
      <div className="contentSpace font-sans">
        <ExpenseProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ExpenseProvider>
      </div>
    </>
  );
}

export default App;
