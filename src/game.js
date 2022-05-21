import React, { useEffect } from "react";
import Phaser from "phaser";

const GameShell = () => {
  var config = {
    type: Phaser.AUTO,
    parent: 'gameRoot',
    pixelArt: true,
    width: 800,
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

export default () => {
  useEffect(() => {
    GameShell();
  }, []);

  return <div id='gameRoot' />;
};
