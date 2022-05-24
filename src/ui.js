import React, { useState } from "react";
import { Email } from "react-obfuscate-email";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faAddressCard,
  faCode
} from "@fortawesome/free-solid-svg-icons";

const classes = {
  navigation: {
    link: "block py-2 pr-4"
  }
};

const isCurrentPage = (compare, name, currentClass) =>
  compare === name ? currentClass + ` ${"current"}` : currentClass;

export default ({
  children,
  currentPage,
  currentDirection,
  onPageChanged = pageIndex => {}
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="ui-root">
      <div className="w-full border-b bg-[#1b1b1b] border-[#314454]">
        <header className="container mx-auto px-4">
          <h1 className="pt-12 pl-12">
            <a
              className="text-blue-200 font-pixel uppercase text-6xl -ml-1"
              href=""
            >
              Sam Fereday
            </a>
          </h1>
          <nav className="pt-6 pb-12 pl-12">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
              <button
                data-collapse-toggle="mobile-menu"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                        0,
                        classes.navigation.link
                      )}
                      onClick={() => onPageChanged(0)}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={isCurrentPage(
                        currentPage,
                        1,
                        classes.navigation.link
                      )}
                      onClick={() => onPageChanged(1)}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={isCurrentPage(
                        currentPage,
                        2,
                        classes.navigation.link
                      )}
                      onClick={() => onPageChanged(2)}
                    >
                      Experience
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={isCurrentPage(
                        currentPage,
                        3,
                        classes.navigation.link
                      )}
                      onClick={() => onPageChanged(3)}
                    >
                      Projects &amp; Code
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={isCurrentPage(
                        currentPage,
                        4,
                        classes.navigation.link
                      )}
                      onClick={() => onPageChanged(4)}
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
      {children}
      <div className="w-full pb-4">
        <footer className="container mx-auto px-4 text-white-100 text-center">
          <p id="instruction" className="py-4">
            <FontAwesomeIcon
              className={`px-4 hover:text-blue-200 cursor-pointer ${currentDirection ===
              -1
                ? "text-blue-200"
                : "text-white"}`}
              icon={faAngleLeft}
            />
            <span className="font-pixel uppercase">
              Use arrow keys to travel &amp; 'e' to enter doors
            </span>
            <FontAwesomeIcon
              className={`px-4 hover:text-blue-200 cursor-pointer ${currentDirection ===
              1
                ? "text-blue-200"
                : "text-white"}`}
              icon={faAngleRight}
            />
          </p>
          <dl className="flex flex-col md:flex-row justify-center">
            <dd>
              <Email
                email="sdfereday.website@gmail.com"
                className="hover:text-blue-200"
              >
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faEnvelope}
                />
              </Email>
            </dd>
            <dd>
              <a
                href="https://github.com/sdfereday"
                target="_blank"
                className="block hover:text-blue-200"
                title="Github"
              >
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faCode}
                />
              </a>
            </dd>
            <dd>
              <a
                href="https://www.linkedin.com/in/sam-fereday-bb4101229"
                target="_blank"
                className="block hover:text-blue-200"
                title="LinkedIn"
              >
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faAddressCard}
                />
              </a>
            </dd>
          </dl>
          <p className="text-xs">
            Built using{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              className="hover:text-[#61dafb]"
            >
              React
            </a>,{" "}
            <a
              href="https://phaser.io/"
              target="_blank"
              className="hover:text-[#b8e6f8]"
            >
              Phaser
            </a>{" "}
            &amp;{" "}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              className="hover:text-[#38bdf8]"
            >
              Tailwind
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
