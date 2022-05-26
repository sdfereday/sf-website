import "./style.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { clamp } from "./system/helpers";
import UI from "./ui/ui";
import Content from "./ui/content";
import Game from "./game/game";
import Pages from "./ui/page-data";

const App = () => {
  /* UI Related */
  const [CurrentPage, setCurrentPage] = useState(0);
  const { pageComponent } = Pages[CurrentPage];
  const onPageChanged = pageIndex => setCurrentPage(pageIndex);

  /* Game Related */
  const [interactActive, setInteractActive] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(0);

  const onDoorwayEntered = (dir, sceneIndex) =>
    onPageChanged(clamp(sceneIndex + dir, 0, Pages.length - 1));

  return (
    <UI
      currentPage={CurrentPage}
      currentDirection={currentDirection}
      interactActive={interactActive}
      onPageChanged={onPageChanged}
    >
      <Game
        currentPage={CurrentPage}
        onArrowPressed={dir => setCurrentDirection(dir)}
        onDoorwayEntered={onDoorwayEntered}
        onInteractPressed={() => setInteractActive(true)}
      >
        <Content currentPage={CurrentPage}>
          {pageComponent}
        </Content>
      </Game>
    </UI>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
