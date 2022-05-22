const checkOverlap = (spriteA, spriteB) => {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

export default ({ onArrowPressed = () => {}, onDoorwayEntered = () => {} }) => {
  const moveSpeed = 70;
  const jumpStrength = 160;

  // Governed by special tiles on layer
  let startPoints = {
    left: {
      x: 0,
      y: 0
    },
    right: {
      x: 0,
      y: 0
    }
  };

  let lastDoorwayEntered = 0;
  let player;
  let cursors;
  let rightDoorway;
  let leftDoorway;

  function create() {
    // load the map (must match above)
    const map = this.make.tilemap({ key: "tilemap_about" });

    // must match tileset name in tiled application
    const tileset = map.addTilesetImage("base_tiles");

    // create layers
    const rear = map.createLayer("Rear", tileset);
    const ground = map.createLayer("Base", tileset);
    const front = map.createLayer("Front", tileset);
    const positioning = map.createLayer("Positioning", tileset);

    // set up camera and layer collisions (avoids anything that's thin air)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    ground.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    // set up start positioning
    startPoints.left = {
      x: map.widthInPixels / 2,
      y: map.heightInPixels / 2
    };

    startPoints.right = {
      x: map.widthInPixels / 2,
      y: map.heightInPixels / 2
    };

    positioning.forEachTile(tile => {
      if (tile.properties.hasOwnProperty("leftStart")) {
        startPoints.left = {
          x: tile.pixelX,
          y: tile.pixelY
        };
      }

      if (tile.properties.hasOwnProperty("rightStart")) {
        startPoints.right = {
          x: tile.pixelX,
          y: tile.pixelY
        };
      }
    });

    // create the player sprite
    player = this.physics.add.sprite(
      lastDoorwayEntered <= 0 ? startPoints.left.x : startPoints.right.x,
      lastDoorwayEntered <= 0 ? startPoints.left.y : startPoints.right.y,
      "player"
    );
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setDepth(1);

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

    cursors.right.on(
      "up",
      function() {
        onArrowPressed(0);
      },
      this
    );

    cursors.left.on(
      "up",
      function() {
        onArrowPressed(0);
      },
      this
    );

    // add other assets
    rightDoorway = this.physics.add.staticSprite(
      map.widthInPixels - 124,
      map.heightInPixels - 24,
      "doorway"
    );
    leftDoorway = this.physics.add.staticSprite(
      124,
      map.heightInPixels - 24,
      "doorway"
    );

    rightDoorway.setDepth(0);
    leftDoorway.setDepth(0);

    this.input.keyboard.on('keydown-E', function (event) {
      if (checkOverlap(player, leftDoorway)) {
        lastDoorwayEntered = lastDoorwayEntered === 1 ? 1 : -1;
        onDoorwayEntered(lastDoorwayEntered);
      }

      if (checkOverlap(player, rightDoorway)) {
        lastDoorwayEntered = lastDoorwayEntered === 1 ? -1 : 1;
        onDoorwayEntered(lastDoorwayEntered);
      }
    });
  }

  function update() {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-moveSpeed); // move left
      player.anims.play("walk", true); // play walk animation
      player.flipX = true; // flip the sprite to the left
      onArrowPressed(-1);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(moveSpeed); // move right
      player.anims.play("walk", true); // play walk animation
      player.flipX = false; // use the original sprite looking to the right
      onArrowPressed(1);
    } else {
      player.body.setVelocityX(0);
      player.anims.play("idle", true);
    }
  }

  return {
    key: "about",
    init: props => { console.log(props)
      if (!props.hasOwnProperty("value")) {
        lastDoorwayEntered = -1;
        return;
      }
      
      lastDoorwayEntered = props.value;
    },
    create: create,
    update: update
  };
};
