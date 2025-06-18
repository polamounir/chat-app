import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  InformationCircleIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [isMenuExtended, setIsMenuExtended] = useState(true);
  // console.log(user);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon className="h-8 w-8 mr-2 hidden lg:block" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <InformationCircleIcon className="h-8 w-8 mr-2 hidden lg:block" />,
    },
    {
      name: "Friends",
      path: "/friends",
      icon: <UsersIcon className="h-8 w-8 mr-2 hidden lg:block" />,
    },
  ];

  return (
    <header
      className={`fixed w-full  top-0 start-0 ${
        isMenuExtended ? "lg:w-max" : "lg:w-20 duration-700"
      }  lg:overflow-hidden lg:h-svh z-50 duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-10 lg:px-0">
        {/* <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
          <button
            onClick={() => setIsMenuExtended(!isMenuExtended)}
            className="lg:px-5 flex items-center gap-7 justify-center p-2 rounded-md text-gray-700 focus:outline-indigo-500 transition-colors"
          >
            {isMenuExtended ? (
              <>
                <XMarkIcon className="block h-8 w-8" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Bars3Icon className="block h-8 w-8" />
                <span>Open</span>
              </>
            )}
          </button>
        </div> */}
        <div className="flex lg:flex-col items-center lg:items-start justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 lg:flex lg:items-center">
            <Link
              to="/"
              className="flex items-center justify-start gap-2 lg:gap-7 ps-1 lg:px-5 "
            >
              <ChatBubbleOvalLeftIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800 lg:hidden">
                Dardash
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex lg:w-full ">
            <div className="ml-10 lg:ml-0 flex lg:flex-col lg:justify-start w-full overflow-hidden">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md lg:rounded-none text-sm font-medium transition-colors flex items-center gap-5 lg:px-5 lg:w-full duration-500 ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }`
                  }
                >
                  {link.icon}
                  <span className="lg:hidden">{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:block lg:flex lg:w-full justify-center  items-center ">
            <div className="lg:ml-0 flex lg:flex-col justify-center w-full items-center">
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({
                      isActive,
                    }) => ` w-full  px-4 lg:px-0 py-2 text-sm font-medium text-gray-700  hover:text-indigo-600 transition-colors flex items-center lg:justify-center gap-5 
                      ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`}
                  >
                    <UserCircleIcon className="h-8 w-8 mr-2 hidden lg:block" />
                    <span className=" lg:hidden">Profile</span>
                  </NavLink>
                  <Link
                    to="/logout"
                    className="px-4 lg:px-0 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-5"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-8 w-8 mr-2 hidden lg:block ms-1" />
                    <span className=" lg:hidden">Logout</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className=" px-3 lg:px-0 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-5"
                >
                  <ArrowLeftStartOnRectangleIcon className="h-8 w-8 mr-2 hidden lg:block " />
                  <span className=" lg:hidden">Sign in</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t mt-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <UserCircleIcon className="h-8 w-8 mr-2 hidden lg:block" />{" "}
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <ArrowLeftEndOnRectangleIcon className="h-8 w-8 mr-2 hidden lg:block" />
                  Logoutss
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <ArrowLeftStartOnRectangleIcon className="h-8 w-8 mr-2 hidden lg:block" />
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// UserCircleIcon,
// ArrowLeftEndOnRectangleIcon,
// ArrowLeftStartOnRectangleIcon,
