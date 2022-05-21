import React, { useEffect } from "react";
import Phaser from "phaser";

const GameShell = () => {
  var config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "gameRoot",
    pixelArt: true,
    backgroundColor: "#1f233c",
    width: 1920,
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload() {}

  function create() {}

  function update() {}
};

export default ({ children }) => {
  useEffect(() => {
    GameShell();
  }, []);

  return (
    <div id="gameRoot">
      {children}
    </div>
  );
};
