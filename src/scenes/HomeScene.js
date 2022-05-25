import Player from "../Player";
import { generateStartPointFromTiles, prepareTileMap } from "../map-helpers";

export default ({
  sceneIndex,
  sceneKey,
  onSceneCreation = () => {},
  onSceneUpdate = () => {}
}) => {
  let lastDoorwayEntered = 0;

  function create() {
    // prepare tilemap for use in this scene
    const { map, layers } = prepareTileMap("tilemap_home", this);
    const { positioning, ground } = layers;

    // set up start positioning
    const leftStart = generateStartPointFromTiles(
      {
        x: map.widthInPixels / 2,
        y: 125
      },
      positioning,
      "leftStart"
    );

    const rightStart = generateStartPointFromTiles(
      {
        x: map.widthInPixels / 2,
        y: 125
      },
      positioning,
      "rightStart"
    );

    // create a new player instance and enable collisions
    const player = new Player(
      this,
      lastDoorwayEntered <= 0 ? leftStart.x : rightStart.x,
      lastDoorwayEntered <= 0 ? leftStart.y : rightStart.y
    );

    this.physics.add.collider(player, ground);

    // add map specific assets for this map
    this.add
      .sprite(rightStart.x - 3, rightStart.y - 6, "homeEntranceGraphic")
      .setDepth(0);

    const rightDoorway = this.add.sprite(0, 0, "doorway");
    rightDoorway.x = rightStart.x;
    rightDoorway.y = rightStart.y;
    rightDoorway.setDepth(0);

    const leftDoorway = null;

    // external event
    onSceneCreation({
      scene: this,
      player,
      rightDoorway,
      leftDoorway,
      sceneIndex,
      sceneKey
    });
  }

  return {
    key: sceneKey,
    init: props => {
      if (!props.hasOwnProperty("value")) {
        lastDoorwayEntered = -1;
        return;
      }

      lastDoorwayEntered = props.value;
    },
    create,
    update: () => onSceneUpdate()
  };
};
