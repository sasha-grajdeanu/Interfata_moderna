import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      setNavItems([
        { path: "/dashboard", label: "Situație școlară" },
        { path: "/", label: "Deconectare", action: logout },
      ]);
    } else {
      setNavItems([{ path: "/login", label: "Conectare" }]);
    }
  }, [location.pathname]);


  useEffect(() => {

    const handleScroll = () => {
      if (nav) {
        setNav(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <div className="bg-[var(--wenge)] flex justify-between items-center h-16 px-4 text-white font-josefinSans">
      <NavLink
        exact
        to="/"
        className="text-3xl text-white"
      >
        I.M. - 1
      </NavLink>
      <div className="hidden md:flex">
        {navItems.map((item) =>
          item.action ? (
            <div
              key={item.path}
              onClick={item.action}
              className="px-4 py-2 hover:bg-[var(--rose-quartz)] rounded-xl m-2 cursor-pointer duration-300 hover:text-black text-lg"
            >
              {item.label}
            </div>
          ) : (
            <NavLink
              key={item.path}
              exact
              to={item.path}
              className="px-4 py-2 hover:bg-[var(--rose-quartz)] rounded-xl m-2 cursor-pointer duration-300 hover:text-black text-lg"
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} className="cursor-pointer" /> : <AiOutlineMenu size={20} className="cursor-pointer" />}
      </div>
      <div
        className={
          nav
            ? "fixed md:hidden left-0 top-[64px] w-[100%] border-r border-r-gray-900 bg-[var(--wenge)] ease-in-out duration-0 flex flex-col text-lg"
            : "ease-in-out md:hidden w-[60%] duration-0 fixed top-0 bottom-0 left-[-100%] text-lg"
        }
      >
        {navItems.map((item) =>
          item.action ? (
            <div
              key={item.path}
              onClick={() => {
                item.action();
                resetNav();
              }}
              className="p-4 hover:bg-[var(--rose-quartz)] duration-300 hover:text-black cursor-pointer w-full text-center"
            >
              {item.label}
            </div>
          ) : (
            <NavLink
              key={item.path}
              exact
              to={item.path}
              onClick={resetNav}
              className="p-4 hover:bg-[var(--rose-quartz)] duration-300 hover:text-black cursor-pointer w-full text-center"
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}
