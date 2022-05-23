import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div>
      <h2>About &amp; CV</h2>
      <p>With a bunch of experience picked up over the years from originally starting out making static HTML sites, I've advanced my knowledge over the years in Frontend development and moved towards specializing in React.</p>
      <p>Whilst React is where it's at, you can also find me delving in to different technologies such as Unity C#, Wordpress, Git, [more needed]. Please feel free to download a copy of my CV for more details.</p>
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
