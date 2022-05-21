import "./style.css";
import React from "react";
import ReactDOM from "react-dom";
import UI from "./ui";
import Content from "./content";
import Game from "./game";

const App = () => {
  return (
    <UI>
      <Game>
        <Content />
      </Game>
    </UI>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
