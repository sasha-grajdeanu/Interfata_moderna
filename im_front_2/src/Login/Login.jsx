import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showBackError, setShowBackError] = useState(false);
  const [msgBackError, setMsgBackError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    e.preventDefault();
    if (username === "" || password === "") {
      setShowError(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        sessionStorage.setItem("jwt", data.access_token);
         navigate("/dashboard");
      } else if (response.status === 404) {
        const data = await response.json();
        setShowBackError(true);
        setMsgBackError(data.error);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setShowBackError(true);
      setMsgBackError(
        "A apărut o eroare. Vă rugăm să încercați din nou mai târziu."
      );
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] font-josefinSans">
      <div className="w-[90%] max-w-md p-8 space-y-6 bg-[var(--french-gray)] rounded-lg flex flex-col">
        <h1 className="text-2xl font-bold text-center text-black">Conectare</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full my-4 text-lg">
            <label htmlFor="nr_matricol" className="font-medium text-black">
              Număr matricol
            </label>
            <input
              type="text"
              name="nr_matricol"
              id="nr_matricol"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {showError && username === "" && (
              <div className="text-base text-red-700 flex flex-row gap-1 items-center pt-2">
                <AiOutlineExclamationCircle size={16} />
                <p>Vă rugăm să furnizați numărul matricol.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full my-4 text-lg">
            <label htmlFor="password" className="font-medium text-black">
              Parolă
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {showError && password === "" && (
              <div className="text-base text-red-700 flex flex-row gap-1 items-center pt-2">
                <AiOutlineExclamationCircle size={16} />
                <p>Vă rugăm să furnizați parola.</p>
              </div>
            )}
          </div>

          {showBackError && msgBackError && (
            <div className="text-base text-red-700 flex flex-row gap- py-2">
              <p>{msgBackError}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-xl font-semibold text-white bg-[var(--wenge)] rounded-md hover:bg-[var(--rose-quartz)] hover:text-black duration-300"
          >
            Conectare
          </button>
        </form>
      </div>
    </div>
  );
}
