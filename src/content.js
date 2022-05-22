import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default ({ children, currentPage }) => {
  useEffect(
    () => {
      console.log("Contents changed.");
    },
    [currentPage]
  );

  return (
    <div className="absolute w-full top-0 h-[600px] bg-gradient-to-t from-slate-900 bg-[length:100%_70px] bg-repeat-x bg-bottom">
      <TransitionGroup className="transition-group">
        <CSSTransition key={currentPage} timeout={500} classNames="fade">
          <div className="absolute z-10 w-full top-0">
            <div className="container mx-auto px-16 pt-32 text-white-100">
              <div className="max-w-4xl">
                {children}
              </div>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
