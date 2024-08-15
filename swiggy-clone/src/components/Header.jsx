import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosArrowDown, IoIosHelpBuoy, IoIosSearch } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const listItem = [
    {
      icon: <IoIosSearch className="inline" />,
      list: "Search",
    },
    {
      icon: <BiSolidOffer className="inline" />,
      list: "Offer",
    },
    {
      icon: <IoIosHelpBuoy className="inline" />,
      list: "Help",
    },
    {
      icon: <IoPersonSharp className="inline" />,
      list: "Sign In",
    },
  ];

  const showSideNav = () => {
    setToggle(true);
  };

  const hideSideNav = () => {
    setToggle(false);
  };

  return (
    <header className="w-full p-4 shadow-lg bg-white">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between">
        {/* Overlay for side navigation */}
        {toggle && (
          <div
            onClick={hideSideNav}
            className="fixed inset-0 bg-black bg-opacity-50 z-10 duration-300"
          ></div>
        )}

        {/* Side Navigation */}
        <div
          className={`fixed top-0 left-0 w-[75%] md:w-[40%] h-full bg-white z-20 transform transition-transform duration-700 ${
            toggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Menu</h2>
            <hr />
            <ul className="space-y-4">
              {listItem.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                >
                  <div className="text-lg">{item.icon}</div>
                  <p className="text-base">{item.list}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center text-sm gap-3">
          <div className="w-[45px]">
            <img className="w-full h-auto" src="/images/logo.png" alt="Logo" />
          </div>
          <h1 className="flex items-center text-base md:text-lg">
            <span className="font-bold border-b-2 border-[#000000b8]">
              Amanaka
            </span>
            &nbsp;Great Eastern Road, Amanaka&nbsp;
            <IoIosArrowDown
              onClick={showSideNav}
              className="text-[orange] font-bold cursor-pointer hidden md:block"
            />
          </h1>
        </div>

        {/* Right Side */}
        <div className="hidden sm:flex sm:flex-row items-center gap-3 mt-3">
          {listItem.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
            >
              <div className="text-lg">{item.icon}</div>
              <p className="text-base">{item.list}</p>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <IoIosArrowDown
            onClick={showSideNav}
            className="text-[orange] font-bold cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
