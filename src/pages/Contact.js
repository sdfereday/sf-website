import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAddressCard } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div>
      <h2>Say Hello!</h2>
      <p>I'm looking for new adventures in development and open to opportunities so please don't hesitate to get in touch!</p>
      <a
        href="#"
        target="_blank"
        className="hover:text-blue-200"
        title="Email"
      >
        <FontAwesomeIcon
          className="px-2 hover:text-blue-200"
          icon={faEnvelope}
        />{" "}
        Email
      </a>
      <a
        href="https://www.linkedin.com/in/sam-fereday-bb4101229"
        target="_blank"
        className="hover:text-blue-200"
        title="LinkedIn"
      >
        <FontAwesomeIcon
          className="px-2 hover:text-blue-200"
          icon={faAddressCard}
        />{" "}
        LinkedIn
      </a>
    </div>
  );
};
