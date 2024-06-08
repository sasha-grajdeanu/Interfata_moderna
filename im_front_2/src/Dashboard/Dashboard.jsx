import Courses from "../Tables/Courses";
import Grades from "../Tables/Grades";
import PersonalData from "../Tables/PersonalData";
import React, { useEffect, useRef, useState } from "react";
import PaymentObligation from "../Tables/PaymentObligation";
import Information from "../Tables/Information";
import PaymentInformation from "../Tables/PaymentInformation";

export default function Dashboard() {
  const [personalData, selectPersonalData] = useState(true);
  const [grades, selectGrades] = useState(false);
  const [paymentObligation, selectPaymentObligation] = useState(false);
  const [paymentInformation, selectPaymentInformation] = useState(false);
  const [semesterCourses, selectSemesterCourses] = useState(false);
  const [information, selectInformation] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const choosePersonalData = () => {
    selectPersonalData(true);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
    selectInformation(false);
  };

  const chooseSemesterCourses = () => {
    selectPersonalData(false);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(true);
    setDropdownOpen(false);
    selectInformation(false);
  };

  const chooseGrades = () => {
    selectPersonalData(false);
    selectGrades(true);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
    selectInformation(false);
  };

  const choosePaymentObligation = () => {
    selectPersonalData(false);
    selectGrades(false);
    selectPaymentObligation(true);
    selectPaymentInformation(false);
    selectSemesterCourses(false);
    setDropdownOpen(false);
    selectInformation(false);
  };

  const choosePaymentInformation = () => {
    selectPersonalData(false);
    selectSemesterCourses(false);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(true);
    setDropdownOpen(false);
    selectInformation(false);
  };

  const chooseInformation = () => {
    selectPersonalData(false);
    selectSemesterCourses(false);
    selectGrades(false);
    selectPaymentObligation(false);
    selectPaymentInformation(false);
    setDropdownOpen(false);
    selectInformation(true);
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
      name: "Plăți efectuate",
      selected: paymentInformation,
      action: choosePaymentInformation,
    },
    {
      name: "Obligații de plată",
      selected: paymentObligation,
      action: choosePaymentObligation,
    },
    {
      name: "Traseu educațional",
      selected: information,
      action: chooseInformation,
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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-64px)] font-urbanist">
      <div className="hidden max-lg:flex mt-2 px-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-Retrosphere-200 text-white px-4 py-2 rounded w-full text-xl font-semibold"
        >
          {personalData && "Date personale"}
          {semesterCourses && "Cursuri"}
          {grades && "Traiectorie note"}
          {paymentObligation && "Obligații de plată"}
          {paymentInformation && "Plăți efectuate"}
          {information && "Traseu educațional"}
        </button>
      </div>

      {dropdownOpen && (
        <div
          id="menu-responsive"
          ref={dropdownRef}
          className="flex flex-col text-xl text-white px-6 py-2 absolute z-10 w-full "
        >
          {menu.map((item) => (
            <button
              key={item.name}
              className={
                item.selected
                  ? "bg-Retrosphere-200 w-full justify-start"
                  : "bg-Retrosphere-300 hover:bg-Retrosphere-200 duration-200 cursor-pointer w-full justify-start"
              }
              onClick={item.action}
            >
              <div className="px-4 py-2">{item.name}</div>
            </button>
          ))}
        </div>
      )}

      <div className="hidden lg:flex flex-row justify-around bg-Retrosphere-200 text-xl xl:text-2xl items-center w-full p-2 text-white">
        {menu.map((item) => (
          <button
            key={item.name}
            className={
              item.selected
                ? "bg-Retrosphere-300 h-full text-center rounded font-semibold"
                : "bg-Retrosphere-200 hover:bg-Retrosphere-300 duration-200 cursor-pointer  h-full text-center rounded"
            }
            onClick={item.action}
          >
            <div className="px-4 py-2">{item.name}</div>
          </button>
        ))}
      </div>

      <div className="flex-grow p-4 px-6">
        {personalData && <PersonalData />}
        {semesterCourses && <Courses />}
        {grades && <Grades />}
        {paymentObligation && <PaymentObligation />}
        {paymentInformation && <PaymentInformation />}
        {information && <Information />}
      </div>
    </div>
  );
}
