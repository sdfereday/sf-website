export const generateStartPointFromTiles = (
  defaultPoints = { x: 0, y: 0 },
  tiles,
  key
) => {
  let startPoint = defaultPoints;

  tiles.forEachTile(tile => {
    if (tile.properties.hasOwnProperty(key)) {
      startPoint = {
        x: tile.pixelX,
        y: tile.pixelY
      };
    }
  });

  return startPoint;
};

export const prepareTileMap = (tileKey, context) => {
  // load the map (must match above)
  const map = context.make.tilemap({ key: tileKey });

  // must match tileset name in tiled application
  const tileset = map.addTilesetImage("base_tiles");

  // create layers
  const rear = map.createLayer("Rear", tileset);
  const ground = map.createLayer("Base", tileset);
  const front = map.createLayer("Front", tileset);
  const positioning = map.createLayer("Positioning", tileset);

  // set up camera and layer collisions (avoids anything that's thin air)
  context.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  ground.setCollisionByExclusion([-1]);

  // set the boundaries of our scene world
  context.physics.world.bounds.width = map.widthInPixels;
  context.physics.world.bounds.height = map.heightInPixels;

  return {
    map,
    layers: {
      rear,
      ground,
      front,
      positioning
    }
  };
};
