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
  ["Home"]: <Home />,
  ["About"]: <About />,
  ["Skills"]: <Skills />,
  ["Projects"]: <Projects />,
  ["Contact"]: <Contact />
};

const App = () => {
  /* UI Related */
  const [CurrentPage, setCurrentPage] = useState("Home");
  const onPageChanged = pageName => setCurrentPage(pageName);

  /* Game Related */
  const [currentDirection, setCurrentDirection] = useState(0);

  return (
    <UI
      currentPage={CurrentPage}
      currentDirection={currentDirection}
      onPageChanged={onPageChanged}
    >
      <Game onArrowPressed={dir => setCurrentDirection(dir)}>
        <Content currentPage={CurrentPage}>
          {Pages[CurrentPage]}
        </Content>
      </Game>
    </UI>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
