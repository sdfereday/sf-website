import React, { useEffect, useState } from "react";
import { createStore } from "state-pool";
import Phaser from "phaser";
import BootScene from "./scenes/Boot";
import HomeScene from "./scenes/HomeScene";
import AboutScene from "./scenes/AboutScene";
import SkillsScene from "./scenes/SkillsScene";
import ProjectsScene from "./scenes/ProjectsScene";
import ContactScene from "./scenes/ContactScene";

const GameTooltip = ({ x, y, children }) => {
  return (
    <div
      className="tooltip font-pixel"
      style={{ left: x + "px", top: y + "px" }}
    >
      {children}
    </div>
  );
};

const GameShell = () => {
  const zoom = 4;
  const emitter = new Phaser.Events.EventEmitter();

  const scenes = ["home", "about", "skills", "projects", "contact"];
  let lastScene = "home";

  const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "gameRoot",
    pixelArt: true,
    backgroundColor: "#10141f", //"#1f233c",
    width: 1920 / zoom, // 480
    height: 600 / zoom, // 150
    zoom,
    physics: {
      default: "arcade",
      arcade: {
        tileBias: 4,
        gravity: { y: 600 },
        debug: false
      }
    }
  };

  const game = new Phaser.Game(config);

  game.scene.add("boot", BootScene(), true);

  game.scene.add(
    "home",
    HomeScene({
      sceneIndex: 0,
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: (dir, index) =>
        emitter.emit("doorwayEntered", dir, index),
      onInteractPressed: () => emitter.emit("interactPressed")
    }),
    false
  );

  game.scene.add(
    "about",
    AboutScene({
      sceneIndex: 1,
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: (dir, index) =>
        emitter.emit("doorwayEntered", dir, index),
      onInteractPressed: () => emitter.emit("interactPressed")
    }),
    false
  );

  game.scene.add(
    "skills",
    SkillsScene({
      sceneIndex: 2,
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: (dir, index) =>
        emitter.emit("doorwayEntered", dir, index),
      onInteractPressed: () => emitter.emit("interactPressed")
    }),
    false
  );

  game.scene.add(
    "projects",
    ProjectsScene({
      sceneIndex: 3,
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: (dir, index) =>
        emitter.emit("doorwayEntered", dir, index),
      onInteractPressed: () => emitter.emit("interactPressed")
    }),
    false
  );

  game.scene.add(
    "contact",
    ContactScene({
      sceneIndex: 4,
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: (dir, index) =>
        emitter.emit("doorwayEntered", dir, index),
      onInteractPressed: () => emitter.emit("interactPressed")
    }),
    false
  );

  // Note: Event names must match to emitters or nothing will call them
  return {
    bindEvent: (eventName, fn) => emitter.on(eventName, fn, game),
    changeSceneByIndex: (index, props = {}) => {
      var theOtherScene = game.scene.getScene(lastScene);
      theOtherScene.scene.stop();

      game.scene.start(scenes[index], props);
      lastScene = scenes[index];
    }
  };
};

const store = createStore();
store.setState("gameInstance", GameShell());

export default ({
  children,
  currentPage,
  onArrowPressed = () => {},
  onDoorwayEntered = () => {},
  onInteractPressed = () => {}
}) => {
  const [gameInstance] = store.useState("gameInstance");
  const [initialBoot, setInitialBoot] = useState(false);
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    gameInstance.bindEvent("arrowPressed", dir => onArrowPressed(dir));
    gameInstance.bindEvent("doorwayEntered", (dir, sceneIndex) =>
      onDoorwayEntered(dir, sceneIndex)
    );
    gameInstance.bindEvent("interactPressed", () => onInteractPressed());
  }, []);

  useEffect(
    () => {
      if (!initialBoot) {
        setInitialBoot(true);
      } else {
        const direction = lastPage > currentPage ? 1 : -1;
        gameInstance.changeSceneByIndex(currentPage, {
          value: direction
        });
      }
      setLastPage(currentPage);
    },
    [currentPage]
  );

  return (
    <div id="gameRoot" className="md:h-[600px]">
      {children}
    </div>
  );
};
