import "./style.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import UI from "./ui";
import Content from "./content";
import Game from "./game";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const Pages = {
  [0]: <Home />,
  [1]: <About />,
  [2]: <Skills />,
  [3]: <Projects />,
  [4]: <Contact />
};

const App = () => {
  /* UI Related */
  const [CurrentPage, setCurrentPage] = useState(0);
  const onPageChanged = pageIndex => setCurrentPage(pageIndex);

  /* Game Related */
  const [currentDirection, setCurrentDirection] = useState(0);
  const [lastDoorway, setLastDoorway] = useState(0);

  const onDoorwayEntered = dir => {
    setLastDoorway(dir);

    const index = CurrentPage + dir <= 0 ? 0 : CurrentPage + dir;
    setCurrentPage(index);
  };

  return (
    <UI
      currentPage={CurrentPage}
      currentDirection={currentDirection}
      onPageChanged={onPageChanged}
    >
      <Game
        currentPage={CurrentPage}
        onArrowPressed={dir => setCurrentDirection(dir)}
        onDoorwayEntered={onDoorwayEntered}
      >
        <Content currentPage={CurrentPage}>
          <h2>{CurrentPage}</h2>
          {Pages[CurrentPage]}
        </Content>
      </Game>
    </UI>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
