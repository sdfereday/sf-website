import Player from "../Player";
import FinalDoor from "../FinalDoor";
import {
  generateStartPointFromTiles,
  prepareTileMap
} from "../../system/helpers";
import {
  CONTACT_ENTRANCE,
  DOORWAY,
  LEFT_START,
  RIGHT_START,
  TILEMAP_CONTACT,
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
  let playerHasKey = false;

  function create() {
    // prepare tilemap for use in this scene
    const { map, layers } = prepareTileMap(TILEMAP_CONTACT, this);
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

    const finalDoor = new FinalDoor(this, 168, 65);

    const rightDoorway = null;

    const leftDoorway = this.add.sprite(0, 0, DOORWAY);
    leftDoorway.x = leftStart.x;
    leftDoorway.y = leftStart.y;
    leftDoorway.setDepth(0);

    this.add
      .sprite(197, 124, TORCH)
      .setFrame(2)
      .anims.play(TORCH_IDLE)
      .setOrigin(0.5, 1);

    this.add
      .sprite(278, 124, TORCH)
      .setFrame(0)
      .anims.play(TORCH_IDLE)
      .setOrigin(0.5, 1);

    // external event
    onSceneCreation({
      scene: this,
      player,
      finalDoor,
      rightDoorway,
      leftDoorway,
      sceneIndex,
      sceneKey
    });
  }

  return {
    key: sceneKey,
    init: props => {
      if (props.hasOwnProperty("playerHasKey"))
        playerHasKey = props.playerHasKey;

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
