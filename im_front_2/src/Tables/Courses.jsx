import React, { useEffect, useState } from "react";
import Information from "./Information";

export default function Courses() {
  const [noOfSemester, setNoOfSemester] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [semesterCourses, setSemesterCourse] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const jwt = sessionStorage.getItem("jwt");
  let isFetching = false;

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (!jwt) {
      window.location.href = "/login";
      return;
    }
    if (noOfSemester !== null) {
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
    console.log(noOfSemester);
    console.log(selectedSemester);
  });

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/login";
      return;
    }
    setSemesterCourse(null);
    if (selectedSemester == null) {
      return;
    }
    console.log(selectedSemester);
    const fetchSemesterCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/semester_courses/?semester=${selectedSemester}`,
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
          setSemesterCourse(data);
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
    fetchSemesterCourses();
  }, [selectedSemester]);

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
              ? "bg-Retrosphere-100 text-white duration-100 font-semibold"
              : "bg-Retrosphere-200 text-white duration-100 cursor-pointer hover:bg-Retrosphere-100"
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
    setLoading(true);
  };

  const handleCourseClick = (course, index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  if (error) {
    return <p className="p-4 text-2xl text-center w-full text-white">Error: {error}</p>;
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
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between flex-wrap my-2">
        <div
          className={`grid w-full gap-2 grid-cols-2 md:flex md:flex-row md:justify-between`}
        >
          {renderSemesterButtons()}
        </div>
      </div>
      {semesterCourses !== null ? (
        <div className="overflow-auto w-full">
          <table className="table-auto w-full text-lg">
            <thead className="bg-Retrosphere-200 text-white font-semibold text-left">
              <tr className="py-2">
                <th className="p-2 max-md:hidden">An universitar</th>
                <th className="p-2">Disciplina</th>
                <th className="p-2">Credite</th>
                <th className="p-2">Nota finală</th>
                <th className="p-2 max-[480px]:hidden">Data</th>
              </tr>
            </thead>
            <tbody className=" bg-Retrosphere-500 font-medium">
              {semesterCourses.map((item, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={`cursor-pointer py-1 ${
                      expandedRow === index
                        ? "bg-Retrosphere-300 font-semibold text-white"
                        : index % 2 === 0 ?
                        "bg-Retrosphere-500"
                        : "bg-Retrosphere-400"
                    }`}
                    onClick={() => handleCourseClick(item, index)}
                  >
                    <td className="px-2 py-1  max-md:hidden">
                      {item["AnUniv"]}
                    </td>
                    <td className="py-1 px-2">
                      {item["Denumire disciplina"]}
                    </td>
                    <td className="py-1 px-2">{item["Credite"]}</td>
                    <td className="py-1 px-2">{item["Nota finala"]}</td>
                    <td className="py-1 max-[480px]:hidden px-2">
                      {item["Data"]}
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className={index % 2 === 0 ?
                      "bg-Retrosphere-500"
                      : "bg-Retrosphere-400"}>
                      <td colSpan="5">
                        <div className="px-2 py-4">
                          <div className="font-bold pb-1 w-full text-center">
                            Istoricul materiei: {item["Denumire disciplina"]}
                          </div>
                          <table className=" w-full">
                            <thead className="bg-Retrosphere-200 text-white text-left">
                              <tr className="">
                                <th className=" p-2 max-md:hidden">
                                  An universitar
                                </th>
                                <th className=" p-2 max-md:hidden">Semestru</th>
                                <th className=" p-2">Data</th>
                                <th className=" p-2 max-[480px]:hidden">
                                  Denumire disciplină
                                </th>
                                <th className=" p-2">Nota finală</th>
                              </tr>
                            </thead>
                            <tbody className={index % 2 === 0 ?
                        "bg-Retrosphere-400"
                        : "bg-Retrosphere-500"}>
                              {item["Istoric"].map((row, rowIndex) => (
                                <tr key={rowIndex} className="">
                                  <td className=" p-2 max-md:hidden">
                                    {row["AnUniv"]}
                                  </td>
                                  <td className=" p-2 max-md:hidden">
                                    {row["Semestru"]}
                                  </td>
                                  <td className=" p-2">{row["Data"]}</td>
                                  <td className=" p-2 max-[480px]:hidden">
                                    {row["Denumire disciplina"]}
                                  </td>
                                  <td className=" p-2">{row["Nota finala"]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full p-auto">
          <p className="text-xl text-center font-semibold py-2 text-white">
            Vă rugăm, așteptați...
          </p>
        </div>
      )}
    </div>
  );
}
