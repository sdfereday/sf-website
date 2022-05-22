import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
      <a
        href="#"
        className="button inline-block hover:bg-blue-300"
        onClick={() => {}}
      >
        Download Lasers{" "}
        <FontAwesomeIcon
          className="px-2 hover:text-blue-200"
          icon={faFilePdf}
        />
      </a>
      <a
        href="#"
        className="button inline-block hover:bg-blue-300"
        onClick={() => {}}
      >
        Activate Lasers
      </a>
    </div>
  );
};
