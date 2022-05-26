import React from "react";
import { LEFT, RIGHT } from "./consts";
import { Email } from "react-obfuscate-email";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faAddressCard,
  faCode
} from "@fortawesome/free-solid-svg-icons";

export default ({ currentDirection }) => {
  return (
    <div className="w-full pb-4">
      <footer className="container mx-auto px-4 py-8 md:py-0 text-white-100 text-center">
        <p id="instruction" className="py-4 md:py-0 md:pb-4">
          <FontAwesomeIcon
            className={`px-4 hover:text-blue-200 cursor-pointer ${currentDirection ===
            LEFT
              ? "text-blue-200"
              : "text-white"}`}
            icon={faAngleLeft}
          />
          <span className="font-pixel uppercase">
            Use arrow keys to travel &amp; 'e' to enter doors
          </span>
          <FontAwesomeIcon
            className={`px-4 hover:text-blue-200 cursor-pointer ${currentDirection ===
            RIGHT
              ? "text-blue-200"
              : "text-white"}`}
            icon={faAngleRight}
          />
        </p>
        <dl className="flex flex-row justify-center">
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
  );
};
