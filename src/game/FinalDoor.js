import Phaser from "phaser";
import { CONTACT_ENTRANCE } from "../system/consts";

class FinalDoor extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, CONTACT_ENTRANCE);

    this.setFrame(0);
    this.setDepth(0);
    this.setOrigin(0, 0);

    scene.add.existing(this);
  }

  open() {
    this.setFrame(1);
  }
}

export default FinalDoor;
