import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div>
      <h2>What I Can Deliver</h2>
      <p>
        From humble beginnings I have moved forwards in to specializing with
        React. However over the years I've worked with numerous companies and
        technologies with a focus on Front-End development at all times.
      </p>
      <p>Some of the places I've worked at previously:</p>
      <p>[1, 0]</p>
      <p>Please feel free to download a copy of my CV for more details:</p>
      <a
        href="#"
        className="button inline-block hover:bg-blue-300"
        onClick={() => {}}
      >
        Download CV{" "}
        <FontAwesomeIcon
          className="px-2 hover:text-blue-200"
          icon={faFilePdf}
        />
      </a>
    </div>
  );
};
