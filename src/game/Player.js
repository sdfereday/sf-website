import Phaser from "phaser";
import { gameConfig } from "../system/config";
import {
  PLAYER,
  INTERACT_ICON,
  WALK,
  IDLE,
  FALL,
  JUMP,
  VICTORY,
  KEY,
  SINE_EASEINOUT
} from "../system/consts";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, PLAYER);
    scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setDepth(20);

    this.disableMovement = false;

    this.helperSprite = scene.add.sprite(this.x, this.y - 15, INTERACT_ICON);
    this.helperSprite.setDepth(10);
    this.helperSprite.setFrame(1);
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

    this.keySprite = scene.add.sprite(this.x, this.y - 5, KEY);
    this.keySprite.setDepth(10);
    this.keySprite.setVisible(false);

    scene.add.existing(this);
  }

  moveLeft() {
    if (this.disableMovement) return;
    this.body.setVelocityX(-gameConfig.moveSpeed); // move left
    this.flipX = true; // flip the sprite to the left
  }

  moveRight() {
    if (this.disableMovement) return;
    this.body.setVelocityX(gameConfig.moveSpeed); // move right
    this.flipX = false; // use the original sprite looking to the right
  }

  jump() {
    if (this.disableMovement) return;

    if (this.body.blocked.down) {
      this.body.setVelocityY(-gameConfig.jumpStrength);
    }
  }

  idle() {
    if (this.disableMovement) return;

    this.body.setVelocityX(0);
  }

  update() {
    if (this.disableMovement) {
      this.anims.play(VICTORY, true);
      this.helperSprite.setVisible(false);
      return;
    }

    if (this.showHelper) {
      this.helperSprite.setVisible(true);
      this.helperSprite.x = this.x;
    } else {
      this.helperSprite.setVisible(false);
    }

    if (this.body.velocity.x !== 0) {
      this.anims.play(WALK, true);
    } else {
      this.anims.play(IDLE, true);
    }

    if (!this.body.blocked.down) {
      this.anims.play(this.body.velocity.y > 0 ? FALL : JUMP, true);
    }
  }

  showExitHelper() {
    this.showHelper = true;
    this.helperSprite.setFrame(1);
  }

  showInteractionHelper() {
    this.showHelper = true;
    this.helperSprite.setFrame(0);
  }

  hideHelper() {
    this.showHelper = false;
  }

  findKey() {
    this.keySprite.x = this.x;
    this.keySprite.setVisible(true);

    const tween = this.scene.tweens.add({
      targets: this.keySprite,
      x: this.x,
      y: this.y - 25,
      duration: 500,
      ease: SINE_EASEINOUT,
      yoyo: false,
      repeat: 0
    });

    tween.on("complete", () => {
      this.keySprite.setVisible(false);
    });
  }

  victory() {
    this.disableMovement = true;
    this.hideHelper();
  }
}

export default Player;
