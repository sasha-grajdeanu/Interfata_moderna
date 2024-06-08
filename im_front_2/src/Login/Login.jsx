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
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] font-urbanist">
      <div className="w-[90%] max-w-lg p-8 space-y-6 bg-Retrosphere-500 rounded-lg flex flex-col">
        <h1 className="text-2xl font-bold text-center text-Retrosphere-100">
          Conectare
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full my-4 text-lg text-Retrosphere-100">
            <label
              htmlFor="nr_matricol"
              className="font-semibold text-Retrosphere-100"
            >
              Număr matricol
            </label>
            <input
              type="text"
              name="nr_matricol"
              id="nr_matricol"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border text-Retrosphere-100 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-Retrosphere-200"
            />
            {showError && username === "" && (
              <div className="text-base text-red-700 flex flex-row gap-1 items-center pt-2">
                <AiOutlineExclamationCircle size={16} />
                <p>Vă rugăm să furnizați numărul matricol.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full my-4 text-lg">
            <label
              htmlFor="password"
              className="font-semibold text-Retrosphere-100"
            >
              Parolă
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border text-Retrosphere-100 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-Retrosphere-200"
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

          <div className="w-full flex justify-center items-center pb-4">
            <a
              href="https://simsweb.uaic.ro/eSIMS/RecoverPassword.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-Retrosphere-300 hover:text-Retrosphere-100 duration-300 font-medium"
            >
              Ai uitat parola?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-xl font-semibold text-white bg-Retrosphere-300 rounded-md hover:bg-Retrosphere-100  duration-300"
          >
            Conectare
          </button>
        </form>
        <div className="w-full flex justify-center items-center">
          <a
            href="https://simsweb.uaic.ro/eSIMS/Register.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-Retrosphere-300 hover:text-Retrosphere-100 duration-300 font-medium"
          >
            Nu ai cont? Înregistreaza-te aici!
          </a>
        </div>
      </div>
    </div>
  );
}
