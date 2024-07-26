import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function PaymentInformation() {
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [paymentDocuments, setPaymentDocuments] = useState(null);
  const [error, setError] = useState(null);
  let isFetching = false;
  let isFetchingSecond = false;
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (!jwt) {
      return;
    }
    isFetching = true;
    const fetchData = async () => {
      console.log("Fetching data with JWT:", jwt);
      try {
        const response = await fetch(
          "http://localhost:5000/history_payments/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setPaymentHistory(data);
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

  useEffect(() => {
    if (!jwt) {
      return;
    }
    if (isFetchingSecond) {
      return;
    }
    if (paymentHistory !== null) {
      isFetchingSecond = true;
      const fetchData = async () => {
        console.log("Fetching data with JWT:", jwt);
        try {
          const response = await fetch("http://localhost:5000/pay_documents/", {
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
            setPaymentDocuments(data);
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
    }
  }, [jwt, paymentHistory]);

  const renderTableDocuments = () => {
    console.log(typeof paymentDocuments);
    if (Array.isArray(paymentDocuments)) {
      return (
        <div className="flex flex-col w-full">
          <div className="overflow-auto w-full">
            <table className="table-auto text-lg  w-full text-left">
              <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white">
                <tr>
                  <th className="p-2 max-[525px]:text-sm">Denumire</th>
                  <th className="   p-2 max-[525px]:text-sm">Nr. document</th>
                  <th className="   p-2 max-[525px]:text-sm">Data emiterii</th>
                  <th className="   p-2 max-[525px]:text-sm">Suma</th>
                </tr>
              </thead>
              <tbody className=" bg-Retrosphere-500 dark:bg-Space-500 font-medium">
                {paymentDocuments.map((item, index) => (
                  <tr
                  key={index}
                    className={`${
                      index % 2 == 0
                        ? "bg-Retrosphere-500 dark:bg-Space-500"
                        : "bg-Retrosphere-400 dark:bg-Space-400"
                    }`}
                  >
                    <td className="p-2 max-[525px]:text-sm">
                      {item.Den}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.NrDocPlata}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.DataDoc}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.Suma}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (typeof paymentDocuments === "object") {
      return (
        <div className="p-4 text-2xl text-center w-full text-white">
          {paymentDocuments["message"]}
        </div>
      );
    } else {
      return <div>Nu sunt date disponibile!</div>;
    }
  };

  const renderTableHistory = () => {
    console.log(typeof paymentHistory);
    if (Array.isArray(paymentHistory)) {
      return (
        <div className="flex flex-col w-full">
          <div className="overflow-auto w-full">
            <table className="table-auto text-lg  w-full text-left">
              <thead className="bg-Retrosphere-200 dark:bg-Space-200 text-white ">
                <tr>
                  <th className="p-2 max-[525px]:text-sm">Sursa</th>
                  <th className="   p-2 max-[525px]:text-sm">Valoare sursă</th>
                  <th className="   p-2 max-[525px]:text-sm">Destinație</th>
                  <th className="   p-2 max-[525px]:text-sm">
                    Valoare destinație
                  </th>
                  <th className="   p-2 max-[480px]:hidden max-[525px]:text-sm">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-Retrosphere-500 dark:bg-Space-500 font-medium">
                {paymentHistory.map((item, index) => (
                  <tr
                  key={index}
                    className={`${
                      index % 2 == 0
                        ? "bg-Retrosphere-500 dark:bg-Space-500"
                        : "bg-Retrosphere-400 dark:bg-Space-400"
                    }`}
                  >
                    <td className="p-2 max-[525px]:text-sm">
                      {item.Sursa}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.SursaVal}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.Destinatie}
                    </td>
                    <td className="p-2 max-[525px]:text-sm">
                      {item.DestVal}
                    </td>
                    <td className="p-2 max-[480px]:hidden max-[525px]:text-sm">
                      {item.DataM}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (typeof paymentHistory === "object") {
      return (
        <div className="p-4 text-2xl text-center w-full">
          {paymentHistory["message"]}
        </div>
      );
    } else {
      return <div>Nu sunt date disponibile!</div>;
    }
  };

  if (error) {
    return (
      <p className="p-4 text-2xl text-center w-full text-white">
        Error: {error}
      </p>
    );
  }

  if (!paymentHistory || !paymentDocuments) {
    return (
      <div className="flex justify-center items-center w-full p-auto">
        <p className="text-xl text-center font-semibold py-2 text-white">
          Vă rugăm, așteptați...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-2">
        {paymentHistory !== null ? (
          <div>
            <div className="text-xl text-center font-semibold py-2 text-white">
              Istoricul de plăți
            </div>
            {renderTableHistory()}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-2">
        <>
          {paymentDocuments !== null ? (
            <div>
              <div className="text-xl text-center font-semibold py-2 text-white">
                Documente de plată
              </div>
              {renderTableDocuments()}
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
}
