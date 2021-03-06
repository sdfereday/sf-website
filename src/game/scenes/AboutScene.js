import Player from "../Player";
import { generateStartPointFromTiles, prepareTileMap } from "../../system/helpers";
import {
  ABOUT_ENTRANCE,
  DOORWAY,
  LEFT_START,
  RIGHT_START,
  TILEMAP_ABOUT
} from "../../system/consts";

export default ({
  sceneIndex,
  sceneKey,
  onSceneCreation = () => {},
  onSceneUpdate = () => {}
}) => {
  let lastDoorwayEntered = 0;

  function create() {
    // prepare tilemap for use in this scene
    const { map, layers } = prepareTileMap(TILEMAP_ABOUT, this);
    const { positioning, ground } = layers;

    // set up start positioning
    const leftStart = generateStartPointFromTiles(
      {
        x: map.widthInPixels / 2,
        y: 125
      },
      positioning,
      LEFT_START
    );

    const rightStart = generateStartPointFromTiles(
      {
        x: map.widthInPixels / 2,
        y: 125
      },
      positioning,
      RIGHT_START
    );

    // create a new player instance and enable collisions
    const player = new Player(
      this,
      lastDoorwayEntered <= 0 ? leftStart.x : rightStart.x,
      lastDoorwayEntered <= 0 ? leftStart.y : rightStart.y
    );

    this.physics.add.collider(player, ground);

    // add map specific assets for this map
    this.add.sprite(240, 108, ABOUT_ENTRANCE).setDepth(0);

    const rightDoorway = this.add.sprite(0, 0, DOORWAY);
    rightDoorway.x = rightStart.x;
    rightDoorway.y = rightStart.y;
    rightDoorway.setDepth(0);

    const leftDoorway = this.add.sprite(0, 0, DOORWAY);
    leftDoorway.x = leftStart.x;
    leftDoorway.y = leftStart.y;
    leftDoorway.setDepth(0);

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
