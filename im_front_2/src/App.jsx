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
      <div className="min-h-screen bg-[var(--magnolia)]">
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
        </main>
      </div>
    </>
  );
}

export default App;
