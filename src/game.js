import React, { useEffect, useState } from "react";
import { createStore } from "state-pool";
import Phaser from "phaser";
import { config, customConfig, scenes } from "./config";
import { overlaps } from "./physics-helpers";
import BootScene from "./scenes/Boot";
import HomeScene from "./scenes/HomeScene";
import AboutScene from "./scenes/AboutScene";
import SkillsScene from "./scenes/SkillsScene";
import ProjectsScene from "./scenes/ProjectsScene";
import ContactScene from "./scenes/ContactScene";

const GameShell = () => {
  const emitter = new Phaser.Events.EventEmitter();
  const game = new Phaser.Game(config);

  // shared variables
  let currentSceneIndex = 0;
  let lastScene = "home";
  let player;
  let cursors;
  let leftDoorway = null;
  let rightDoorway = null;
  let overlapsLeftDoorway = false;
  let overlapsRightDoorway = false;

  // shared methods
  const onSceneCreation = sceneData => {
    player = sceneData.player;
    leftDoorway = sceneData.leftDoorway;
    rightDoorway = sceneData.rightDoorway;
    currentSceneIndex = sceneData.sceneIndex;
  };

  const onSceneUpdate = () => {
    // not sure why but this doesn't get called internally
    player.update();

    if (cursors.left.isDown) {
      player.moveLeft();
      emitter.emit("arrowPressed", -1);
    } else if (cursors.right.isDown) {
      player.moveRight();
      emitter.emit("arrowPressed", 1);
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

    player.showHelper = overlapsLeftDoorway || overlapsRightDoorway;
  };

  const onJumpPressed = () => {
    if (player.body.blocked.down) {
      player.body.setVelocityY(-customConfig.jumpStrength);
    }
  };

  const onInteractPressed = () => {
    if (overlapsLeftDoorway)
      emitter.emit("doorwayEntered", -1, currentSceneIndex);
    if (overlapsRightDoorway)
      emitter.emit("doorwayEntered", 1, currentSceneIndex);

    emitter.emit("interactPressed");
  };

  // level scenes
  game.scene.add(
    "home",
    HomeScene({
      sceneIndex: 0,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    "about",
    AboutScene({
      sceneIndex: 1,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    "skills",
    SkillsScene({
      sceneIndex: 2,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    "projects",
    ProjectsScene({
      sceneIndex: 3,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  game.scene.add(
    "contact",
    ContactScene({
      sceneIndex: 4,
      onSceneCreation,
      onSceneUpdate
    }),
    false
  );

  // boot scene area
  game.scene.add(
    "boot",
    BootScene({
      onArrowPressed: dir => emitter.emit("arrowPressed", dir),
      onJumpPressed,
      onInteractPressed,
      onBootCreation: bootProps => {
        player = bootProps.player;
        cursors = bootProps.cursors;
        leftDoorway = bootProps.leftDoorway;
        rightDoorway = bootProps.rightDoorway;

        game.scene.start("home", {
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
      var theOtherScene = game.scene.getScene(lastScene);
      theOtherScene.scene.stop();

      game.scene.start(scenes[index], props);
      lastScene = scenes[index];
    }
  };
};

const store = createStore();
store.setState("gameInstance", GameShell());

export default ({
  children,
  currentPage,
  onArrowPressed = () => {},
  onDoorwayEntered = () => {},
  onInteractPressed = () => {}
}) => {
  const [gameInstance] = store.useState("gameInstance");
  const [initialBoot, setInitialBoot] = useState(false);
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    gameInstance.bindEvent("arrowPressed", dir => onArrowPressed(dir));
    gameInstance.bindEvent("doorwayEntered", (dir, sceneIndex) =>
      onDoorwayEntered(dir, sceneIndex)
    );
    gameInstance.bindEvent("interactPressed", () => onInteractPressed());
  }, []);

  useEffect(
    () => {
      if (!initialBoot) {
        setInitialBoot(true);
      } else {
        const direction = lastPage > currentPage ? 1 : -1;
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
