import React, { useEffect, useState } from "react";

export default function Information() {
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let isFetching = false;
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      return;
    }

    if (isFetching) {
      return;
    }

    isFetching = true;

    const fetchSelectionInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/selection_info/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSelectionInfo(data);
        } else if (response.status === 401) {
          sessionStorage.removeItem("jwt");
          window.location.href = "/login";
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

    fetchSelectionInfo();
  }, [jwt]);

  if (error) {
    return (
      <p className="p-4 text-2xl text-center w-full text-white">
        Error: {error}
      </p>
    );
  }

  return loading ? (
    <div className="flex justify-center items-center w-full p-auto">
      <p className="text-xl text-center font-semibold py-2 text-white">
        Vă rugăm, așteptați...
      </p>
    </div>
  ) : (
    selectionInfo && (
      <div className="flex flex-col w-full">
        <div className="overflow-auto">
          <table className="table-auto text-lg w-full text-left">
            <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white font-semibold">
              <tr>
                <th className=" p-2">An universitar</th>
                <th className=" max-md:hidden p-2 ">An studiu</th>
                <th className="   p-2 ">Semestru</th>
                <th className="p-2">Facultate</th>
                <th className="p-2">Grupă</th>
                <th className="max-md:hidden p-2 ">Profil</th>
                <th className="   p-2 ">Specializare</th>
                <th className="max-lg:hidden p-2">Universitate</th>
              </tr>
            </thead>
            <tbody className="bg-Retrosphere-500 dark:bg-Space-500 font-medium  text-lg">
              {selectionInfo.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0 ? "bg-Retrosphere-500 dark:bg-Space-500" : "bg-Retrosphere-400 dark:bg-Space-400"
                  }`}
                >
                  <td className="p-2">
                    {item.AnUniv}
                  </td>
                  <td className=" max-md:hidden p-2">{item.AnStudiu}</td>
                  <td className=" p-2">{item.Semestru}</td>
                  <td className=" p-2">{item.Facultate}</td>
                  <td className=" p-2">{item.Grupa}</td>
                  <td className="p-2 max-md:hidden">{item.Profil}</td>

                  <td className=" p-2">{item.Specializare}</td>
                  <td className="p-2 max-lg:hidden">{item.Univ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}
