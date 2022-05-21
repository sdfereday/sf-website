import './style.css';
import React from "react";
import ReactDOM from "react-dom";
import UI from "./ui";
import Game from "./game";

/* React UI */
const App = () => {
  return (
    <div className="container mx-auto px-4">
      <UI />
      <Game />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
