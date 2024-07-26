import React, { useEffect, useState } from "react";

export default function PaymentObligation() {
  const [noOfSemester, setNoOfSemester] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [obligations, setObligations] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let isFetching = false;
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (!jwt) {
      window.location.href = "/login";
      return;
    }
    isFetching = true;
    const fetchNoSemester = async () => {
      try {
        const response = await fetch("http://localhost:5000/count_semester/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setNoOfSemester(data["No. of semester"]);
          setSelectedSemester(1);
        } else if (response.status === 401) {
          const data = await response.json();
          setError(data.error);
          sessionStorage.removeItem("jwt");
          window.location.href = "/login";
        } else if (response.status === 400) {
          const data = await response.json();
          setError(data.error);
        } else {
          const errorText = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorText);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchNoSemester();
  }, [jwt]);

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/login";
      return;
    }
    setObligations(null);
    if (selectedSemester == null) {
      return;
    }
    const fetchObligations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/obligations/?semester=${selectedSemester}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setObligations(data);
        } else if (response.status === 401) {
          const data = await response.json();
          setError(data.error);
          sessionStorage.removeItem("jwt");
          window.location.href = "/login";
        } else if (response.status === 400) {
          const data = await response.json();
          setError(data.error);
        } else {
          const errorText = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorText);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchObligations();
  }, [selectedSemester, jwt]);

  const renderSemesterButtons = () => {
    const buttons = [];
    for (let i = 1; i <= noOfSemester; i++) {
      buttons.push(
        <button
          id={i}
          key={i}
          onClick={() => handleSemesterClick(i)}
          disabled={loading}
          className={`px-2 py-2 rounded text-lg text-center w-full max-md:text-sm ${
            selectedSemester === i
              ? "bg-Retrosphere-100 dark:bg-Space-100 text-white duration-100 font-semibold"
              : "bg-Retrosphere-200 dark:bg-Space-200 text-white duration-100 cursor-pointer hover:bg-Retrosphere-100 dark:hover:bg-Space-100"
          }`}
        >
          {`Semestrul ${i}`}
        </button>
      );
    }
    return buttons;
  };

  const handleSemesterClick = (index) => {
    setSelectedSemester(index);
    setExpandedRow(null);
  };

  const renderTable = () => {
    if (Array.isArray(obligations)) {
      return (
        <div className="overflow-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white font-semibold">
              <tr>
                <th className="p-2 ">Denumire</th>
                <th className="p-2">Suma</th>
                <th className="p-2 max-md:hidden">Monedă</th>
                <th className="p-2 max-md:hidden">Semestru</th>
                <th className="p-2 ">An Universitar</th>
                <th className="p-2 ">Suma plătită</th>
              </tr>
            </thead>
            <tbody className=" bg-Retrosphere-500 dark:bg-Space-500 font-medium">
              {obligations.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0 ? "bg-Retrosphere-500 dark:bg-Space-500" : "bg-Retrosphere-400 dark:bg-Space-400"
                  }`}
                >
                  <td className="p-2">{item.Den}</td>
                  <td className="p-2 md:hidden">
                    {`${item.Suma} ${item.Moneda}`}
                  </td>
                  <td className="p-2 max-md:hidden">{item.Suma}</td>
                  <td className="p-2 max-md:hidden">
                    {item.Moneda}
                  </td>
                  <td className="p-2 max-md:hidden">
                    {item.Semestru}
                  </td>
                  <td className=" p-2">{item.AnUniv}</td>
                  <td className=" p-2 max-md:hidden">
                    {item.Platit}
                  </td>
                  <td className="  p-2 md:hidden">
                    {`${item.Platit} ${item.Moneda}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (typeof obligations === "object") {
      return (
        <div className="p-4 text-2xl text-center w-full text-white">
          {obligations["message"]}
        </div>
      );
    } else {
      return <div>No data available</div>;
    }
  };

  if (error) {
    return (
      <p className="p-4 text-2xl text-center w-full text-white">
        Error: {error}
      </p>
    );
  }

  if (!noOfSemester) {
    return (
      <div className="flex justify-center items-center w-full p-auto">
        <p className="text-xl text-center font-semibold py-2 text-white">
          Vă rugăm, așteptați...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row w-full justify-between flex-wrap my-2">
        <div className="grid w-full gap-2 grid-cols-2 md:flex md:flex-row md:justify-between">
          {renderSemesterButtons()}
        </div>
      </div>
      <div className="items-center py-4 ">
        {obligations !== null ? (
          renderTable()
        ) : (
          <div className="flex justify-center items-center w-full p-auto">
            <p className="text-xl text-center font-semibold py-2 text-white">
              Vă rugăm, așteptați...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
