import Courses from "../Tables/Courses";
import Grades from "../Tables/Grades";
import PaymentDocuments from "../Tables/PaymentDocuments";
import PersonalData from "../Tables/PersonalData";
import PaymentHistory from "../Tables/PaymentHistory";
import React, { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [personalData, selectPersonalData] = useState(true);
  const [grades, selectGrades] = useState(false);
  const [paymentObligation, selectPaymentObligation] = useState(false);
  const [paymentInformation, selectPaymentInformation] = useState(false);
  const [semesterCourses, selectSemesterCourses] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const choosePersonalData = () => {
    selectPersonalData(true);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
  };

  const chooseSemesterCourses = () => {
    selectPersonalData(false);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(true);
    setDropdownOpen(false);
  };

  const chooseGrades = () => {
    selectPersonalData(false);
    selectGrades(true);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
  };

  const choosePaymentObligation = () => {
    selectPersonalData(false);
    selectGrades(false);
    selectPaymentObligation(true);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
  };

  const choosePaymentInformation = () => {
    selectPersonalData(false);
    selectSemesterCourses(false);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(true);
    setDropdownOpen(false);
  };

  const menu = [
    {
      name: "Date personale",
      selected: personalData,
      action: choosePersonalData,
    },
    {
      name: "Cursuri",
      selected: semesterCourses,
      action: chooseSemesterCourses,
    },
    {
      name: "Traiectorie note",
      selected: grades,
      action: chooseGrades,
    },
    {
      name: "Informatii privitoare la plati",
      selected: paymentInformation,
      action: choosePaymentInformation,
    },
    {
      name: "Obligatii de plata",
      selected: paymentObligation,
      action: choosePaymentObligation,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {

    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen]);


  return (
    <div className="flex flex-col lg:flex-row justify-between min-h-[calc(100vh-64px)] font-josefinSans">
      <div className="hidden max-lg:flex p-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-[var(--battleship-gray)] text-white px-4 py-2 rounded w-full text-xl"
        >
          {personalData && "Date personale"}
          {semesterCourses && "Cursuri"}
          {grades && "Traiectorie note"}
          {paymentObligation && "Obligatii de plata"}
          {paymentInformation && "Informatii privitoare la plati"}
        </button>
      </div>

      {dropdownOpen && (
        <div
          id="menu-responsive"
          ref={dropdownRef}
          className="flex flex-col text-xl text-white p-4 absolute z-10 w-full"
        >
          {menu.map((item) => (
            <button
              key={item.name}
              className={
                item.selected
                  ? "bg-[var(--french-gray)] w-full justify-start text-black"
                  : "bg-[var(--battleship-gray)] hover:bg-[var(--french-gray)] hover:text-black duration-200 cursor-pointer w-full justify-start"
              }
              onClick={item.action}
            >
              <div className="px-4 py-2">{item.name}</div>
            </button>
          ))}
        </div>
      )}

      <div className="hidden lg:flex flex-col bg-[var(--battleship-gray)] text-2xl items-center justify-center max-w-[256px]">
        {menu.map((item) => (
          <button
            key={item.name}
            className={
              item.selected
                ? "bg-[var(--french-gray)] w-full justify-start text-start"
                : "bg-[var(--battleship-gray)] hover:bg-[var(--french-gray)] duration-200 cursor-pointer text-white hover:text-black w-full justify-start text-start"
            }
            onClick={item.action}
          >
            <div className="px-4 py-2">{item.name}</div>
          </button>
        ))}
      </div>

      <div className="flex-grow flex justify-center items-start lg:items-center p-4">
        {personalData && <PersonalData />}
        {semesterCourses && <Courses />}
        {grades && <Grades />}
        {paymentObligation && <div>Payment Obligation Component</div>}
        {paymentInformation && (
          <div className="flex flex-col space-y-4 w-full">
            <h1 className="text-xl text-center">Documente de plata</h1>
            <PaymentDocuments />
            <h1 className="text-xl text-center">Istoricul de plati</h1>
            <PaymentHistory />
          </div>
        )}
      </div>
    </div>
  );
}
