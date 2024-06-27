import React, { useEffect, useState } from "react";

export default function PersonalData() {
  const [personalData, setPersonalData] = useState(null);
  const [error, setError] = useState(null);
  let isFetching = false;
  const jwt = sessionStorage.getItem("jwt");
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
        const response = await fetch("http://localhost:5000/personal_data/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
            cache: "no-cache",
          },
        });

        console.log("Response status:", response.status);
        if (response.status === 200) {
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
  }, []);

  if (error) {
    return <p className="p-4 text-2xl text-center w-full text-white">Error: {error}</p>;
  }

  if (!personalData) {
    return <div className="flex justify-center items-center w-full p-auto">
    <p className="text-xl text-center font-semibold py-2 text-white">
      Vă rugăm, așteptați...
    </p>
  </div>;
  }

  return (
    <div className="flex items-center">
      <div className="overflow-auto w-full md:px-6">
        <table className=" table-auto text-lg w-full">
          <tbody>
            <tr className="max-sm:flex flex-col">
              <th className=" bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                ID
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData.ID}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Nume
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData.NUME}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Număr Matricol
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData.MATRICOL}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Număr telefon
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData.TELEFON}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                E-mail
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["E-MAIL"]}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Data nașterii
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["DATA NASTERII"]}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Mama
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["MAMA"]}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Tata
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["TATA"]}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Naționalitatea
              </th>
              <td className=" bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["NATIONALITATEA"]}
              </td>
            </tr>
            <tr className="max-sm:flex flex-col">
              <th className="bg-Retrosphere-200 dark:bg-Space-200 flex items-start p-2 text-white font-semibold">
                Cetățenia
              </th>
              <td className="bg-Retrosphere-500 dark:bg-Space-500 p-2 font-medium">
                {personalData["CETATENIA"]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
