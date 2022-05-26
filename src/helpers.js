import { BASE_TILES, REAR, BASE, FRONT, POSITIONING } from "./consts";

/* Numbers */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/* Physics */
// Source: https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
// Check if rectangle a contains rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
export const contains = (a, b) => {
  return !(b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2);
};

// Check if rectangle a overlaps rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
export const overlaps = (a, b) => {
  // no horizontal overlap
  if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;

  // no vertical overlap
  if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;

  return true;
};

// Check if rectangle a touches rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
export const touches = (a, b) => {
  // has horizontal gap
  if (a.x1 > b.x2 || b.x1 > a.x2) return false;

  // has vertical gap
  if (a.y1 > b.y2 || b.y1 > a.y2) return false;

  return true;
};

/* Map */
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
  const tileset = map.addTilesetImage(BASE_TILES);

  // create layers
  const rear = map.createLayer(REAR, tileset);
  const ground = map.createLayer(BASE, tileset);
  const front = map.createLayer(FRONT, tileset);
  const positioning = map.createLayer(POSITIONING, tileset);

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
