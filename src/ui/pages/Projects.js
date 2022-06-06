import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div className="pt-8">
      <h2>What have I worked on?</h2>
      <p className="max-w-4xl">
        A few examples of projects I've worked on over my development career.
        Please feel free to find me on{" "}
        <a
          href="https://github.com/sdfereday"
          target="_blank"
          className="hover:text-blue-200"
          title="Github"
        >
          GitHub
        </a>{" "}
        also which has a few examples of some past prototypes (and the source
        code for this site).
      </p>
      <div className="grid md:grid-cols-3 grid-row justify-items-stretch">
        <div className="bg-slate-900 rounded-md p-4 md:mr-8 mb-8 md:mb-0">
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <a
                className="inline-block text-xl text-slate-500 hover:text-blue-200"
                href="https://github.com/sdfereday/sf-website"
                target="_blank"
              >
                sdfereday.co.uk{" "}
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
              <p className="text-base">
                A link to the source code for this web site which houses a
                mixture of React and Phaser. I wanted to create something that
                I've never really tackled before and to see how well a hybrid of
                a game and a web site might work together.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-md p-4 md:mr-8 mb-8 md:mb-0">
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <a
                className="inline-block text-xl text-slate-500 hover:text-blue-200"
                href="https://legallydistinct.itch.io/shadowblade"
                target="_blank"
                title="Shadowblade"
              >
                Shadowblade{" "}
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
              <p className="text-base">
                University final year team project built in Unity where I wrote
                numerous scripts to handle level transitions, in-game events and
                some gameplay dynamics to name a few.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-md p-4 md:mr-8 mb-8 md:mb-0">
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <a
                className="inline-block text-xl text-slate-500 hover:text-blue-200"
                href="https://www.lawblacks.com/"
                target="_blank"
                title="Blacks Solicitors"
              >
                Blacks Solicitors{" "}
                <FontAwesomeIcon
                  className="px-2 hover:text-blue-200"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
              <p className="text-base">
                Custom WordPress site that makes use of relational data to link
                content together. I worked on putting the templates together
                based on designs by{" "}
                <a
                  href="https://www.burnettdesign.co.uk/"
                  title="Burnett Design"
                >
                  Burnett Design
                </a>{" "}
                and the backend functionality to perform searches plus general
                user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
