import React, { useEffect, useState } from "react";

export default function PersonalData() {
  const [personalData, setPersonalData] = useState(null);
  const [error, setError] = useState(null);
  const jwt = sessionStorage.getItem("jwt");
  console.log(jwt)

  useEffect(() => {
    if (!jwt) {
      return;
    }

    const fetchData = async () => {
      console.log("Fetching data with JWT:", jwt);
      try {
        const response = await fetch("http://localhost:5000/personal_data/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setPersonalData(data);
        } else if (response.status === 401) {
          const data = await response.json();
          console.warn("Unauthorized access, redirecting to login.");
          setError(data.error);
          sessionStorage.removeItem("jwt");
          window.location.href = "/login";
        } else {
          const errorText = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [jwt]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!personalData) {
    return <p className="text-2xl">Loading...</p>;
  }

  return (
    <table className=" table-auto border border-black w-full p-2">
      <tbody>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black flex items-start pl-4">ID</th>
          <td className="border border-black pl-4 font-mono">{personalData.ID}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black flex items-start pl-4">Nume</th>
          <td className="border border-black pl-4 font-mono">{personalData.NUME}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Număr Matricol</th>
          <td className="border border-black pl-4 font-mono">{personalData.MATRICOL}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Număr telefon</th>
          <td className="border border-black pl-4 font-mono">{personalData.TELEFON}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">E-mail</th>
          <td className="border border-black pl-4 font-mono">{personalData["E-MAIL"]}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Data nasterii</th>
          <td className="border border-black pl-4 font-mono">{personalData["DATA NASTERII"]}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Mama</th>
          <td className="border border-black pl-4 font-mono">{personalData["MAMA"]}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Tata</th>
          <td className="border border-black pl-4 font-mono">{personalData["TATA"]}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Nationalitatea</th>
          <td className="border border-black pl-4 font-mono">{personalData["NATIONALITATEA"]}</td>
        </tr>
        <tr className="max-sm:flex flex-col">
          <th className="border bg-[var(--battleship-gray)] border-black p flex items-start pl-4">Cetatenia</th>
          <td className="border border-black pl-4 font-mono">{personalData["CETATENIA"]}</td>
        </tr>
      </tbody>
    </table>
  );
}
