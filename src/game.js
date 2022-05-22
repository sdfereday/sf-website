import React, { useEffect } from "react";
import Phaser from "phaser";
import HomeScene from "./scenes/HomeScene";
import AboutScene from "./scenes/AboutScene";

const GameShell = ({
  currentPage,
  onArrowPressed = () => {},
  onDoorwayEntered = () => {}
}) => {
  const zoom = 4;

  const scenes = {
    [0]: HomeScene({
      onArrowPressed,
      onDoorwayEntered
    }),
    [1]: AboutScene({
      onArrowPressed,
      onDoorwayEntered
    })
  };

  var config = {
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
    },
    scene: [scenes[0], scenes[1]],
    currentPage
  };

  const game = new Phaser.Game(config);
  game.scene.start("home", {
    currentPage
  });
};

export default ({
  children,
  currentPage,
  onArrowPressed = () => {},
  onDoorwayEntered = () => {}
}) => {
  const onDoorwayEnteredEvent = dir => {
    console.log("Doorway entered:" + dir + ".");
    onDoorwayEntered(dir);
  };

  useEffect(() => {
    GameShell({
      currentPage,
      onArrowPressed,
      onDoorwayEntered: onDoorwayEnteredEvent
    });
  }, []);

  return (
    <div id="gameRoot">
      {children}
    </div>
  );
};
