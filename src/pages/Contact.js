import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faAddressCard,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { Email } from "react-obfuscate-email";

export default () => {
  return (
    <div className="lg:pt-32 pt-6 pb-6 max-w-4xl">
      <h2>Say Hello!</h2>
      <p>
        I'm looking for new adventures in development and open to opportunities
        so please don't hesitate to get in touch!
      </p>
      <Email
        email="sdfereday.website@gmail.com"
        className="hover:text-blue-200"
      >
        <FontAwesomeIcon
          className="px-1 hover:text-blue-200"
          icon={faEnvelope}
        />Email
      </Email>
      <a
        href="https://www.linkedin.com/in/sam-fereday-bb4101229"
        target="_blank"
        className="hover:text-blue-200"
        title="LinkedIn"
      >
        <FontAwesomeIcon
          className="px-1 pl-4 hover:text-blue-200"
          icon={faAddressCard}
        />{" "}
        LinkedIn
      </a>
      <a
        href="https://github.com/sdfereday"
        target="_blank"
        className="hover:text-blue-200"
        title="Github"
      >
        <FontAwesomeIcon className="px-1 pl-3 hover:text-blue-200" icon={faCode} />{" "}
      GitHub
      </a>
    </div>
  );
};
