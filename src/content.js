import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div className="absolute z-10 w-full bottom-0 h-[600px] bg-gradient-to-t from-slate-900 bg-[length:100%_70px] bg-repeat-x bg-bottom">
      <div className="container mx-auto px-16 pt-32 text-white-100">
        <div className="max-w-4xl">
          <h2>Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
          <a href="#" className="button inline-block hover:bg-blue-300" onclick="">
            Download Lasers{" "}
            <FontAwesomeIcon
              className="px-2 hover:text-blue-200"
              icon={faFilePdf}
            />
          </a>
          <a href="#" className="button inline-block hover:bg-blue-300" onclick="">
            Activate Lasers
          </a>
        </div>
      </div>
    </div>
  );
};
