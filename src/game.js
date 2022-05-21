import React, { useEffect } from "react";
import Phaser from "phaser";
import tiledMapJSON from "./assets/map.json";
import tilesGraphic from "./assets/tiles.png";
import playerGraphic from "./assets/player.png";

const GameShell = () => {
  const zoom = 4;
  const moveSpeed = 70;
  const jumpStrength = 160;

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
    scene: {
      key: "main",
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);

  let player;
  let cursors;

  function preload() {
    // To work out tiled application world size: n / tileSize / zoom (example: 600 / 8 / 4)
    // load in JSON data for tile placement
    this.load.tilemapTiledJSON("tilemap", tiledMapJSON);

    // must match tileset names below
    this.load.image("base_tiles", tilesGraphic);

    // player animations
    this.load.spritesheet("player", playerGraphic, {
      frameWidth: 16,
      frameHeight: 27
    });

    // pickup
    //this.load.image("pickup", "assets/pickup.png");
  }

  function create() {
    // load the map (must match above)
    const map = this.make.tilemap({ key: "tilemap" });

    // must match tileset name in tiled application
    const tileset = map.addTilesetImage("base_tiles");

    // create layers
    const rear = map.createLayer("Rear", tileset);
    const ground = map.createLayer("Base", tileset);
    const front = map.createLayer("Front", tileset);

    // set up camera and layer collisions (avoids anything that's thin air)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    ground.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    // create the player sprite
    player = this.physics.add.sprite(
      map.widthInPixels / 2,
      map.heightInPixels / 2,
      "player"
    );
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // small fix to our player images, we resize the physics body object slightly
    this.physics.add.collider(player, ground);

    // bindings
    cursors = this.input.keyboard.createCursorKeys();

    cursors.up.on(
      "down",
      function() {
        if (player.body.blocked.down) {
          player.body.setVelocityY(-jumpStrength);
        }
      },
      this
    );

    // anims
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 1] }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [3, 4, 5, 6, 7]
      }),
      frameRate: 16,
      repeat: -1
    });
  }

  function update() {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-moveSpeed); // move left
      player.anims.play("walk", true); // play walk animation
      player.flipX = true; // flip the sprite to the left
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(moveSpeed); // move right
      player.anims.play("walk", true); // play walk animatio
      player.flipX = false; // use the original sprite looking to the right
    } else {
      player.body.setVelocityX(0);
      player.anims.play("idle", true);
    }
  }
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
