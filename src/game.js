import React, { useEffect, useState } from "react";
import { createStore } from "state-pool";
import Phaser from "phaser";
import BootScene from "./scenes/Boot";
import HomeScene from "./scenes/HomeScene";
import AboutScene from "./scenes/AboutScene";

const GameShell = () => {
  const zoom = 4;
  const emitter = new Phaser.Events.EventEmitter();

  const scenes = ["home", "about"];
  let lastScene = "home";

  const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "gameRoot",
    pixelArt: true,
    backgroundColor: "#1f233c",
    width: 1920 / zoom,
    height: 600 / zoom,
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
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: dir => emitter.emit("doorwayEntered", dir)
    }),
    false
  );

  game.scene.add(
    "about",
    AboutScene({
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onDoorwayEntered: dir => emitter.emit("doorwayEntered", dir)
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
  onDoorwayEntered = () => {}
}) => {
  const [gameInstance] = store.useState("gameInstance");
  const [initialBoot, setInitialBoot] = useState(false);
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    gameInstance.bindEvent("arrowPressed", dir => onArrowPressed(dir));
    gameInstance.bindEvent("doorwayEntered", dir => onDoorwayEntered(dir));
  }, []);

  useEffect(
    () => {
      if (!initialBoot) {
        setInitialBoot(true);
      } else {
        gameInstance.changeSceneByIndex(currentPage, {
          value: lastPage > currentPage ? 1 : -1
        });
      }
      setLastPage(currentPage);
    },
    [currentPage]
  );

  return (
    <div id="gameRoot">
      {children}
    </div>
  );
};
