import Phaser from "phaser";

const zoom = 4;

export const config = {
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

export const customConfig = {
  moveSpeed: 70,
  jumpStrength: 160,
  sceneFadeDuration: 200
};

export const scenes = ["home", "about", "skills", "projects", "contact"];

export const getWorldCenter = () => ({
  x: config.width / 2,
  y: config.height / 2
});
