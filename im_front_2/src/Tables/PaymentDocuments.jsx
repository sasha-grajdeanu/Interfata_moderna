import React, { useEffect, useState } from "react";

export default function PaymentDocuments() {
  const [paymentDocuments, setPaymentDocuments] = useState(null);
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
  }, [jwt]);

  

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!paymentDocuments) {
    return <p className="text-2xl">Loading...</p>;
  }

  return (
    <div className="flex flex-col w-full space-y-8">
    <table className="table-auto border border-black w-full">
      <thead>
        <tr>
          <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:text-sm">
            Denumire
          </th>
          <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:text-sm">
            Nr. Ordin de plata
          </th>
          <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:text-sm">
            Data emiterii
          </th>
          <th className="border bg-[var(--battleship-gray)] border-black p-2 max-[480px]:text-sm">
            Suma
          </th>
        </tr>
      </thead>
      <tbody className="border border-black">
          {paymentDocuments.map((item) => (
            <tr className="border border-black font-mono">
                <td className="border border-black text-center max-[480px]:text-sm">{item.Den}</td>
                <td className="border border-black text-center max-[480px]:text-sm">{item.NrDocPlata}</td>
                <td className="border border-black text-center max-[480px]:text-sm">{item.DataDoc}</td>
                <td className="border border-black text-center max-[480px]:text-sm">{item.Suma}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}
