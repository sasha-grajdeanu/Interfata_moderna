import React, { useEffect, useState } from "react";

export default function Courses() {
  const [countSemester, setCountSemester] = useState(0);
  const [noSemester, setNoSemester] = useState(1);
  const [error, setError] = useState(null);
  const jwt = sessionStorage.getItem("jwt");
  console.log(jwt);

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/login";
      return;
    }
    const fetchData = async () => {
      console.log("Fetching data with JWT:", jwt);
      try {
        const response = await fetch("http://localhost:5000/count_semester/", {
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
          setCountSemester(data["No. of semester"]);
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

  if (!countSemester) {
    return <p className="text-2xl">Loading...</p>;
  }
  return (
    <div className="flex flex-row justify-around w-full">
      {Array.from({ length: countSemester }, (_, index) => (
        <button
          key={index}
          className="bg-[var(--wenge)] text-white px-6 py-2 rounded text-xl"
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
