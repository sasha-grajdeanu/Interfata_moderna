// App.js
import { useState } from "react";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navbar/Navbar";
import AuthGuard from "./AuthGuard";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="min-h-screen h-full ">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
          </Routes>

          {/* <div className="flex">
            <button onClick={handleClick} className="flex-initial w-64 font-bold underline decoration-sky-500 text-red-800">
              Change Mode (Dark/Light)
            </button>
          </div> */}
        </main>
      </div>
    </>
  );
}

export default App;
