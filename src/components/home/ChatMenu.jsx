import React, { useState } from "react";
import avaImg from "../../assets/avatar.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function ChatMenu() {
  const [chatContentMenu, setContentMenu] = useState("Contants");
  const toggleMenu = (chat) => {
    setContentMenu(chat);
  };
  return (
    <div className="flex h-full bg-sky-50 dark:bg-gray-900">
      <div className="max-w-80 bg-white p-5 h-full">
        <div className="chat-menu-header">
          <div className="overflow-hidden relative">
            <input
              type="text"
              placeholder="search"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name="searchContact"
              className="py-2 px-5 pe-15 border border-indigo-300 rounded-full w-full text-indigo-300 focus:text-indigo-600 outline-0 dark:bg-gray-800 dark:text-gray-200 focus:border-indigo-500 dark:focus:border-gray-600 transition duration-300 ease-in-out placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pe-5 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-indigo-400" />
            </span>
          </div>
        </div>

        <div>
          <div className="mt-5">
            <div className="flex items-center justify-start mb-4 gap-2">
              <button
                onClick={() => toggleMenu("Contants")}
                className={`px-3 rounded text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition duration-300 ease-in-out ${
                  chatContentMenu == "Contants" &&
                  "bg-indigo-500 text-white rounded-full "
                }`}
              >
                <h2 className="">Contant</h2>
              </button>
              <button
                onClick={() => toggleMenu("Groups")}
                className={`px-3 rounded text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition duration-500 ease-in-out ${
                  chatContentMenu == "Groups" &&
                  " bg-indigo-500 text-white rounded-full"
                }`}
              >
                <h2 className="">Groups</h2>
              </button>
            </div>
            {chatContentMenu === "Contants" && (
              <ul className="space-y-2 h-[70svh] overflow-y-scroll">
                {Array.from({ length: 20 }).map((_, index) => (
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="relative w-10 h-10">
                      <img
                        src={avaImg}
                        alt="User Avatar"
                        className="min-w-10 min-h-10 max-h-10 max-w-10 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        John Doe
                      </span>
                      <div className="flex-1 flex items-center justify-between gap-5 overflow-hidden">
                        <div className="max-w-30">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-30">
                            Last message here dsfsd sddsf sdf sdf sdf sdf
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          2:30 PM
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {chatContentMenu === "Groups" && (
              <ul className="space-y-2 h-[70svh] overflow-y-scroll">
                {Array.from({ length: 20 }).map((_, index) => (
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="relative w-10 h-10">
                      <img
                        src={avaImg}
                        alt="User Avatar"
                        className="min-w-10 min-h-10 max-h-10 max-w-10 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        Group {index}
                      </span>
                      <div className="flex-1 flex items-center justify-between gap-5 overflow-hidden">
                        <div className="max-w-30">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-30">
                            Last message here dsfsd sddsf sdf sdf sdf sdf
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          2:30 PM
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
