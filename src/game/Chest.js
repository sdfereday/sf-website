import Phaser from "phaser";
import { CHEST } from "../system/consts";

class Chest extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, CHEST);
    scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setFrame(0);
    this.setOrigin(0.5, 1);

    scene.add.existing(this);
  }

  open() {
    this.setFrame(1);
  }
}

export default Chest;
