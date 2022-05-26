import Player from "../Player";
import {
  generateStartPointFromTiles,
  prepareTileMap
} from "../../system/helpers";
import {
  DOORWAY,
  HOME_BACKGROUND,
  LEFT_START,
  RIGHT_START,
  TILEMAP_HOME,
  TORCH,
  TORCH_IDLE
} from "../../system/consts";

export default ({
  sceneIndex,
  sceneKey,
  onSceneCreation = () => {},
  onSceneUpdate = () => {}
}) => {
  let lastDoorwayEntered = 0;

  function create() {
    // add backgrounds first
    this.add.image(0, 0, HOME_BACKGROUND).setOrigin(0, 0).setDepth(0);

    // prepare tilemap for use in this scene
    const { map, layers } = prepareTileMap(TILEMAP_HOME, this);
    const { positioning, ground } = layers;

    // set up start positioning
    const leftStart = generateStartPointFromTiles(
      {
        x: map.widthInPixels / 4,
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
    const rightDoorway = this.add.sprite(0, 0, DOORWAY);
    rightDoorway.x = rightStart.x;
    rightDoorway.y = rightStart.y;
    rightDoorway.setDepth(0);

    const leftDoorway = null;

    this.add
      .sprite(293, 125, TORCH)
      .setFrame(2)
      .anims.play(TORCH_IDLE)
      .setOrigin(0.5, 1);
      
    this.add
      .sprite(340, 127, TORCH)
      .setFrame(0)
      .anims.play(TORCH_IDLE)
      .setOrigin(0.5, 1);

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
