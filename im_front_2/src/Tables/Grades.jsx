import React, { useEffect, useState } from "react";

export default function Grades() {
  const [grades, setGrades] = useState(null);
  const [error, setError] = useState(null);
  const jwt = sessionStorage.getItem("jwt");
  console.log(jwt);

  useEffect(() => {
    if (!jwt) {
      return;
    }

    const fetchData = async () => {
      console.log("Fetching data with JWT:", jwt);
      try {
        const response = await fetch("http://localhost:5000/grades/", {
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
          setGrades(data);
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

  if (!grades) {
    return <p className="text-2xl">Loading...</p>;
  }

  const oddIndexGrades = grades.filter((_, index) => index % 2 !== 0);
  console.log(oddIndexGrades);

  return (
    <div className="flex flex-col w-full space-y-8">
        <h1 className="text-xl text-center">Traiectorie pe semestre</h1>
      <table className="table-auto border border-black w-full">
        <thead>
          <tr>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Semestru
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:hidden">
              Medie Aritmetrica
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Medie ECTS
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Puncte
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Credite
            </th>
          </tr>
        </thead>
        <tbody className="border border-black">
          {grades.map((item) => (
            <tr className="border border-black font-mono">
              <td className="border border-black text-center">
                {item.Semestru}
              </td>
              <td className="border border-black text-center max-[480px]:hidden">
                {item.MedieAritm}
              </td>
              <td className="border border-black text-center">
                {item.MedieECTS}
              </td>
              <td className="border border-black text-center">{item.Puncte}</td>
              <td className="border border-black text-center">
                {item.Credite}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-xl text-center">Traiectorie pe ani</h1>

      <table className="table-auto border border-black w-full">
        <thead>
          <tr>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              An
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:hidden">
              Medie Aritmetrica
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Medie ECTS
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Puncte
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2">
              Credite
            </th>
          </tr>
        </thead>
        <tbody className="border border-black">
          {oddIndexGrades.map((item, index) => (
            <tr className="border border-black font-mono">
              <td className="border border-black text-center">{index + 1}</td>
              <td className="border border-black text-center max-[480px]:hidden">
                {item.MedieAritmAn}
              </td>
              <td className="border border-black text-center">
                {item.MedieECTSAn}
              </td>
              <td className="border border-black text-center">
                {item.PuncteAn}
              </td>
              <td className="border border-black text-center">
                {item.CrediteAn}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
