import React from "react";
import Header from "./header";
import Footer from "./footer";

export default ({
  children,
  currentPage,
  currentDirection,
  onPageChanged = pageIndex => {}
}) => {
  return (
    <div className="ui-root">
      <Header currentPage={currentPage} onPageChanged={onPageChanged} />
      {children}
      <Footer currentDirection={currentDirection} />
    </div>
  );
};
