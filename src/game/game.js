import Phaser from "phaser";
import React, { useEffect, useState } from "react";
import { createStore } from "state-pool";
import { systemConfig } from "../system/config";
import { overlaps } from "../system/helpers";
import BootScene from "./scenes/Boot";
import HomeScene from "./scenes/HomeScene";
import AboutScene from "./scenes/AboutScene";
import SkillsScene from "./scenes/SkillsScene";
import ProjectsScene from "./scenes/ProjectsScene";
import ContactScene from "./scenes/ContactScene";
import {
  LEFT,
  RIGHT,
  SCENE_TRANSITION_DURATION,
  SCENEKEYS,
  BOOTKEY,
  HOMEKEY,
  HOMEINDEX,
  ABOUTKEY,
  ABOUTINDEX,
  SKILLSKEY,
  SKILLSINDEX,
  PROJECTSKEY,
  PROJECTSINDEX,
  CONTACTKEY,
  CONTACTINDEX,
  GAME_INSTANCE_KEY,
  GameEvents
} from "../system/consts";

const GameShell = () => {
  const emitter = new Phaser.Events.EventEmitter();
  const game = new Phaser.Game(systemConfig);

  // shared variables
  let currentSceneData = null;
  let currentSceneIndex = HOMEINDEX;
  let lastScene = HOMEKEY;
  let player;
  let cursors;
  let leftDoorway = null;
  let rightDoorway = null;
  let chest = null;
  let finalDoor = null;
  let overlapsLeftDoorway = false;
  let overlapsRightDoorway = false;
  let overlapsChest = false;
  let overlapsFinalDoor = false;
  let playerHasKey = false;
  let playerOpenedDoor = false;

  // shared methods
  const onSceneCreation = sceneData => {
    currentSceneData = sceneData.scene;
    currentSceneData.cameras.main.fadeIn(SCENE_TRANSITION_DURATION);
    player = sceneData.player;
    leftDoorway = sceneData.leftDoorway;
    rightDoorway = sceneData.rightDoorway;
    currentSceneIndex = sceneData.sceneIndex;
    chest = sceneData.chest;
    finalDoor = sceneData.finalDoor;

    if (chest && playerHasKey) chest.open();
    if (finalDoor && playerOpenedDoor) finalDoor.open();
  };

  const onSceneUpdate = () => {
    // not sure why but this doesn't get called internally
    player.update();

    if (cursors.left.isDown) {
      player.moveLeft();
      emitter.emit(GameEvents.ARROW_PRESSED, LEFT);
    } else if (cursors.right.isDown) {
      player.moveRight();
      emitter.emit(GameEvents.ARROW_PRESSED, RIGHT);
    } else {
      player.idle();
    }

    overlapsLeftDoorway =
      leftDoorway !== null &&
      overlaps(
        {
          x1: player.x,
          x2: player.x + player.width,
          y1: player.y,
          y2: player.y + player.height
        },
        {
          x1: leftDoorway.x,
          x2: leftDoorway.x + leftDoorway.width,
          y1: leftDoorway.y,
          y2: leftDoorway.y + leftDoorway.height
        }
      );

    overlapsRightDoorway =
      rightDoorway !== null &&
      overlaps(
        {
          x1: player.x,
          x2: player.x + player.width,
          y1: player.y,
          y2: player.y + player.height
        },
        {
          x1: rightDoorway.x,
          x2: rightDoorway.x + rightDoorway.width,
          y1: rightDoorway.y,
          y2: rightDoorway.y + rightDoorway.height
        }
      );

    if (chest) {
      overlapsChest = overlaps(
        {
          x1: player.x,
          x2: player.x + player.width,
          y1: player.y,
          y2: player.y + player.height
        },
        {
          x1: chest.x,
          x2: chest.x + chest.width,
          y1: chest.y,
          y2: chest.y + chest.height
        }
      );
    }

    if (finalDoor) {
      overlapsFinalDoor = overlaps(
        {
          x1: player.x,
          x2: player.x + player.width,
          y1: player.y,
          y2: player.y + player.height
        },
        {
          x1: finalDoor.x,
          x2: finalDoor.x + finalDoor.width,
          y1: finalDoor.y,
          y2: finalDoor.y + finalDoor.height
        }
      );
    }

    if (overlapsLeftDoorway || overlapsRightDoorway) {
      player.showExitHelper();
    } else if (overlapsChest && !playerHasKey) {
      player.showInteractionHelper();
    } else if (overlapsFinalDoor && playerHasKey) {
      player.showInteractionHelper();
    } else {
      player.hideHelper();
    }
  };

  const onJumpPressed = () => player.jump();

  const onInteractPressed = () => {
    if (overlapsLeftDoorway)
      emitter.emit(GameEvents.DOORWAY_ENTERED, -1, currentSceneIndex);
    if (overlapsRightDoorway)
      emitter.emit(GameEvents.DOORWAY_ENTERED, 1, currentSceneIndex);

    if (overlapsChest && !playerHasKey) {
      emitter.emit(GameEvents.CHEST_OPENED);
      playerHasKey = true;
      chest.open();
      player.findKey();
    }

    if (overlapsFinalDoor && playerHasKey) {
      emitter.emit(GameEvents.FINAL_DOOR_OPENED);
      playerOpenedDoor = true;
      finalDoor.open();
      player.victory();
    }

    emitter.emit(GameEvents.INTERACT_PRESSED);
  };

  const onReadyNextScene = (index, previousScene, props) => {
    game.scene.getScene(previousScene).scene.stop();
    game.scene.start(SCENEKEYS[index], props);
    return SCENEKEYS[index];
  };

  // level scenes
  game.scene.add(
    HOMEKEY,
    HomeScene({
      sceneKey: HOMEKEY,
      sceneIndex: HOMEINDEX,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    ABOUTKEY,
    AboutScene({
      sceneKey: ABOUTKEY,
      sceneIndex: ABOUTINDEX,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    SKILLSKEY,
    SkillsScene({
      sceneKey: SKILLSKEY,
      sceneIndex: SKILLSINDEX,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    PROJECTSKEY,
    ProjectsScene({
      sceneKey: PROJECTSKEY,
      sceneIndex: PROJECTSINDEX,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    CONTACTKEY,
    ContactScene({
      sceneKey: CONTACTKEY,
      sceneIndex: CONTACTINDEX,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  // boot scene area
  game.scene.add(
    BOOTKEY,
    BootScene({
      sceneKey: BOOTKEY,
      onArrowPressed: dir => emitter.emit(GameEvents.ARROW_PRESSED, dir),
      onJumpPressed,
      onInteractPressed,
      onBootCreation: bootProps => {
        player = bootProps.player;
        cursors = bootProps.cursors;
        leftDoorway = bootProps.leftDoorway;
        rightDoorway = bootProps.rightDoorway;

        game.scene.start(HOMEKEY, {
          game,
          ...bootProps
        });
      }
    }),
    true
  );

  // Note: Event names must match to emitters or nothing will call them
  return {
    bindEvent: (eventName, fn) => emitter.on(eventName, fn, game),
    changeSceneByIndex: (index, props = {}) => {
      if (currentSceneData !== null) {
        currentSceneData.cameras.main.fadeOut(SCENE_TRANSITION_DURATION);
        currentSceneData.cameras.main.once(
          GameEvents.CAMERA_FADED_OUT,
          () =>
            (lastScene = onReadyNextScene(index, lastScene, {
              ...props,
              playerHasKey
            }))
        );
      } else {
        lastScene = onReadyNextScene(index, lastScene, {
          ...props,
          playerHasKey
        });
      }
    }
  };
};

const store = createStore();
store.setState(GAME_INSTANCE_KEY, GameShell());

export default ({
  children,
  currentPage,
  onArrowPressed = () => {},
  onDoorwayEntered = () => {},
  onInteractPressed = () => {}
}) => {
  const [gameInstance] = store.useState(GAME_INSTANCE_KEY);
  const [initialBoot, setInitialBoot] = useState(false);
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    gameInstance.bindEvent(GameEvents.ARROW_PRESSED, dir =>
      onArrowPressed(dir)
    );
    gameInstance.bindEvent(GameEvents.DOORWAY_ENTERED, (dir, sceneIndex) =>
      onDoorwayEntered(dir, sceneIndex)
    );
    gameInstance.bindEvent(GameEvents.INTERACT_PRESSED, () =>
      onInteractPressed()
    );
  }, []);

  useEffect(
    () => {
      if (!initialBoot) {
        setInitialBoot(true);
      } else {
        const direction = lastPage > currentPage ? RIGHT : LEFT;
        gameInstance.changeSceneByIndex(currentPage, {
          value: direction
        });
      }
      setLastPage(currentPage);
    },
    [currentPage]
  );

  return (
    <div id="gameRoot" className="md:h-[600px]">
      {children}
    </div>
  );
};
