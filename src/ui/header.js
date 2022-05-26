import React, { useState } from "react";
import {
  HOMEINDEX,
  ABOUTINDEX,
  SKILLSINDEX,
  PROJECTSINDEX,
  CONTACTINDEX
} from "../system/consts";

export default ({ currentPage, onPageChanged = pageIndex => {} }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const isCurrentPage = (compare, name, currentClass) =>
    compare === name ? currentClass + ` ${"current"}` : currentClass;

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="w-full border-b border-[#314454]">
      <header className="container mx-auto px-4">
        <h1 className="pt-12 pl-12-lg pl-4">
          <a
            href="#"
            className={`inline-block text-blue-200 uppercase text-4xl -ml-1`}
            onClick={() => onPageChanged(HOMEINDEX)}
          >
            Sam Fereday
          </a>
        </h1>
        <nav className="pt-6 pb-12 pl-12-lg pl-4">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className={
                "inline-flex items-center p-2 text-sm text-gray-500 bg-blue-100 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              }
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={onToggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`${toggleMenu
                ? "hidden"
                : ""} w-full md:block md:w-auto`}
              id="mobile-menu"
            >
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium">
                <li>
                  <a
                    href="#"
                    className={isCurrentPage(
                      currentPage,
                      HOMEINDEX,
                      "block py-2 pr-4"
                    )}
                    onClick={() => onPageChanged(HOMEINDEX)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={isCurrentPage(
                      currentPage,
                      ABOUTINDEX,
                      "block py-2 pr-4"
                    )}
                    onClick={() => onPageChanged(ABOUTINDEX)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={isCurrentPage(
                      currentPage,
                      SKILLSINDEX,
                      "block py-2 pr-4"
                    )}
                    onClick={() => onPageChanged(SKILLSINDEX)}
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={isCurrentPage(
                      currentPage,
                      PROJECTSINDEX,
                      "block py-2 pr-4"
                    )}
                    onClick={() => onPageChanged(PROJECTSINDEX)}
                  >
                    Projects &amp; Code
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={isCurrentPage(
                      currentPage,
                      CONTACTINDEX,
                      "block py-2 pr-4"
                    )}
                    onClick={() => onPageChanged(CONTACTINDEX)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
