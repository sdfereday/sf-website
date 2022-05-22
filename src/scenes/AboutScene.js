export default ({ onArrowPressed = () => {}, onDoorwayEntered = () => {} }) => {
  const moveSpeed = 70;
  const jumpStrength = 160;

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

    let lastDoorwayEntered = 0;
    this.physics.add.overlap(player, rightDoorway, () => {
      if (lastDoorwayEntered !== 1 || lastDoorwayEntered === 0) {
        lastDoorwayEntered = 1;
        onDoorwayEntered(lastDoorwayEntered);
      }
    });
    this.physics.add.overlap(player, leftDoorway, () => {
      if (lastDoorwayEntered !== -1 || lastDoorwayEntered === 0) {
        lastDoorwayEntered = -1;
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
      player.anims.play("walk", true); // play walk animatio
      player.flipX = false; // use the original sprite looking to the right
      onArrowPressed(1);
    } else {
      player.body.setVelocityX(0);
      player.anims.play("idle", true);
    }
  }

  return {
    key: "about",
    create: create,
    update: update
  };
};
