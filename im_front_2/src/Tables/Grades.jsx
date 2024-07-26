import React, { useEffect, useState } from "react";

export default function Grades() {
  const [grades, setGrades] = useState(null);
  const [error, setError] = useState(null);
  const jwt = sessionStorage.getItem("jwt");
  let isFetching = false;
  console.log(jwt);

  useEffect(() => {
    if (!jwt) {
      return;
    }
    if (isFetching) {
      return;
    }

    isFetching = true;

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
    return (
      <p className="p-4 text-2xl text-center w-full text-white">
        Error: {error}
      </p>
    );
  }

  if (!grades) {
    return (
      <div className="flex justify-center items-center w-full p-auto">
        <p className="text-xl text-center font-semibold py-2 text-white">
          Vă rugăm, așteptați...
        </p>
      </div>
    );
  }

  const oddIndexGrades = grades.filter((_, index) => index % 2 !== 0);
  console.log(oddIndexGrades);

  return (
    <div className="">
      <div className="flex flex-col w-full space-y-8">
        <h1 className="text-xl font-semibold text-white text-center">
          Traiectoria studentului pe semestre
        </h1>
        <div className="overflow-auto w-full">
          <table className="table-auto text-lg w-full text-left">
            <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white font-semibold">
              <tr className="py-2">
                <th className="   p-2">Semestru</th>
                <th className="p-2 max-[480px]:hidden">Media Aritmetică</th>
                <th className="   p-2">Media ECTS</th>
                <th className="   p-2">Puncte</th>
                <th className="   p-2">Credite</th>
              </tr>
            </thead>
            <tbody className=" bg-Retrosphere-500 dark:bg-Space-500 font-medium">
              {grades.map((item, index) => (
                <tr
                  key={item.Semestru}
                  className={`${
                    index % 2 == 0 ? "bg-Retrosphere-500 dark:bg-Space-500" : "bg-Retrosphere-400 dark:bg-Space-400"
                  }`}
                >
                  <td className=" p-2">{item.Semestru}</td>
                  <td className="max-[480px]:hidden">
                    {item.MedieAritm}
                  </td>
                  <td className=" p-2">{item.MedieECTS}</td>
                  <td className=" p-2">{item.Puncte}</td>
                  <td className=" p-2">{item.Credite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-xl text-center font-semibold text-white">
          Traiectoria studentului pe ani
        </h1>
        <div className="overflow-auto w-full">
          <table className="table-auto w-full text-left">
            <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white font-semibold">
              <tr>
                <th className="p-2">An</th>
                <th className="p-2 max-[480px]:hidden">Media Aritmetică</th>
                <th className="   p-2">Medie ECTS</th>
                <th className="   p-2">Puncte</th>
                <th className="   p-2">Credite</th>
              </tr>
            </thead>
            <tbody className=" bg-Retrosphere-500 dark:bg-Space-500 font-medium">
              {oddIndexGrades.map((item, index) => (
                <tr
                key={item.Semestru}
                  className={`${
                    index % 2 == 0 ? "bg-Retrosphere-500 dark:bg-Space-500" : "bg-Retrosphere-400 dark:bg-Space-400"
                  }`}
                >
                  <td className=" p-2">{index + 1}</td>
                  <td className="max-[480px]:hidden">
                    {item.MedieAritmAn}
                  </td>
                  <td className=" p-2">{item.MedieECTSAn}</td>
                  <td className=" p-2">{item.PuncteAn}</td>
                  <td className=" p-2">{item.CrediteAn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
