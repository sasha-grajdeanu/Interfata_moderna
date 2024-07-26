import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    if (sessionStorage.theme === "dark" || !("theme" in sessionStorage)) {
      //add class=dark in html element
      document.documentElement.classList.remove("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.add("dark");
    }

    if (sessionStorage.theme === "dark") {
      sessionStorage.theme = "light";
    } else {
      sessionStorage.theme = "dark";
    }
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      setNavItems([
        { label: "Schimbare temă", action: handleClick },
        { path: "/dashboard", label: "Situație școlară" },
        { path: "/", label: "Deconectare", action: logout },
      ]);
    } else {
      setNavItems([
        { label: "Schimbare temă", action: handleClick },
        { path: "/login", label: "Conectare" },
      ]);
    }
  }, [location.pathname]);

  const handleScroll = () => {
    if (nav) {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nav]);

  const handleNav = () => {
    setNav(!nav);
  };

  const resetNav = () => {
    setNav(false);
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="bg-Retrosphere-100 dark:bg-Space-100 flex justify-between items-center h-16 px-4 text-white font-urbanist">
      <NavLink to="/" className="text-3xl text-white font-semibold">
        I.M. - 1
      </NavLink>
      <div className="hidden md:flex">
        {navItems.map((item) =>
          item.action ? (
            <div
              key={item.label}
              onClick={item.action}
              className="px-4 py-2 hover:bg-Retrosphere-200 dark:hover:bg-Space-200 rounded-xl font-semibold m-2 cursor-pointer duration-300  text-lg"
            >
              {item.label}
            </div>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              className={`px-4 py-2 hover:bg-Retrosphere-200 dark:hover:bg-Space-200 rounded-xl font-semibold m-2 duration-300 text-lg ${
                location.pathname === item.path
                  ? "bg-Retrosphere-200 dark:bg-Space-200 duration-300"
                  : "cursor-pointer"
              }`}
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} className="cursor-pointer" />
        ) : (
          <AiOutlineMenu size={20} className="cursor-pointer" />
        )}
      </div>
      <div
        className={
          nav
            ? "fixed md:hidden left-0 top-[64px] w-[100%] bg-Retrosphere-100 dark:bg-Space-100 ease-in-out duration-0 flex flex-col text-lg"
            : "ease-in-out md:hidden w-[60%] duration-0 fixed top-0 bottom-0 left-[-100%] text-lg"
        }
      >
        {navItems.map((item) =>
          item.action ? (
            <div
              key={item.label}
              onClick={() => {
                item.action();
                resetNav();
              }}
              className="p-4 hover:bg-Retrosphere-200 dark:hover:bg-Space-200 duration-300 cursor-pointer w-full text-center font-semibold"
            >
              {item.label}
            </div>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={resetNav}
              className={`p-4 hover:bg-Retrosphere-200 dark:hover:bg-Space-200 duration-300 w-full text-center font-semibold ${
                location.pathname === item.path
                  ? "bg-Retrosphere-200 dark:bg-Space-200 duration-300"
                  : "cursor-pointer"
              }`}
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}
