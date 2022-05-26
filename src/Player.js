import Phaser from "phaser";
import { gameConfig } from "./config";
import { PLAYER, EXIT, WALK, IDLE, FALL, JUMP, SINE_EASEINOUT } from "./consts";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, PLAYER);
    scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setDepth(20);

    this.helperSprite = scene.add.sprite(this.x, this.y - 15, EXIT);
    this.helperSprite.setDepth(10);
    this.helperSprite.setVisible(false);
    this.showHelper = false;

    scene.tweens.add({
      targets: this.helperSprite,
      x: this.x,
      y: this.y - 25,
      duration: 300,
      ease: SINE_EASEINOUT,
      yoyo: true,
      repeat: -1
    });

    scene.add.existing(this);
  }

  moveLeft() {
    this.body.setVelocityX(-gameConfig.moveSpeed); // move left
    this.anims.play(WALK, true); // play walk animation
    this.flipX = true; // flip the sprite to the left
  }

  moveRight() {
    this.body.setVelocityX(gameConfig.moveSpeed); // move right
    this.anims.play(WALK, true); // play walk animation
    this.flipX = false; // use the original sprite looking to the right
  }

  idle() {
    this.body.setVelocityX(0);
    this.anims.play(IDLE, true);
  }

  update() {
    if (this.showHelper) {
      this.helperSprite.setVisible(true);
      this.helperSprite.x = this.x;
    } else {
      this.helperSprite.setVisible(false);
    }

    if (!this.body.blocked.down) {
      this.anims.play(this.body.velocity.y > 0 ? FALL : JUMP, true);
    }
  }
}

export default Player;
