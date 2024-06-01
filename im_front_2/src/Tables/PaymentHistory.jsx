import React, { useEffect, useState } from "react";

export default function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState(null);
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!paymentHistory) {
    return <p className="text-2xl">Loading...</p>;
  }

  return (
    <div className="flex flex-col w-full space-y-8">
      <table className="table-auto border border-black w-full">
        <thead>
          <tr>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[525px]:text-sm">
              Sursa
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[525px]:text-sm">
              Valoare sursa
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[525px]:text-sm">
              Destinatie
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[525px]:text-sm">
              Valoare destinatie
            </th>
            <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:hidden max-[525px]:text-sm">
              Data
            </th>
          </tr>
        </thead>
        <tbody className="border border-black">
          {paymentHistory.map((item) => (
            <tr className="border border-black font-mono">
              <td className="border border-black text-center max-[525px]:text-sm">{item.Sursa}</td>
              <td className="border border-black text-center max-[525px]:text-sm">
                {item.SursaVal}
              </td>
              <td className="border border-black text-center max-[525px]:text-sm">
                {item.Destinatie}
              </td>
              <td className="border border-black text-center max-[525px]:text-sm">{item.DestVal}</td>
              <td className="border border-black text-center max-[480px]:hidden max-[525px]:text-sm">{item.DataM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
