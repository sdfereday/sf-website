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
    <div className="md:absolute w-full top-0 md:h-[600px] bg-gradient-to-t from-slate-900 bg-[length:100%_70px] bg-repeat-x bg-bottom">
      <TransitionGroup className="transition-group">
        <CSSTransition key={currentPage} timeout={500} classNames="fade">
          <div className="md:absolute z-10 w-full top-0 bg-[#10141f] md:bg-transparent">
            <div className="container mx-auto px-16-lg px-8 text-white-100">
              {children}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
