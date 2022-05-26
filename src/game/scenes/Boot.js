import tiledMapJSONHome from "../../assets/map-home.json";
import tiledMapJSONAbout from "../../assets/map-about.json";
import tiledMapJSONExperience from "../../assets/map-experience.json";
import tiledMapJSONProjects from "../../assets/map-projects.json";
import tiledMapJSONContact from "../../assets/map-contact.json";
import tilesGraphic from "../../assets/environment_tiles.png";
import playerGraphic from "../../assets/player.png";
import doorwayGraphic from "../../assets/doorway.png";
import homeBackground from "../../assets/home_background.png";
import aboutEntranceGraphic from "../../assets/about_entrance.png";
import experienceEntranceGraphic from "../../assets/experience_entrance.png";
import projectsEntranceGraphic from "../../assets/projects_entrance.png";
import contactEntranceGraphic from "../../assets/contact_entrance.png";
import bookstackGraphic from "../../assets/bookstack.png";
import interactGraphic from "../../assets/interact.png";
import chestGraphic from "../../assets/chest.png";
import keyGraphic from "../../assets/key.png";
import torchGraphic from "../../assets/torch.png";
import {
  InputEvents,
  BASE_TILES,
  PLAYER,
  WALK,
  IDLE,
  FALL,
  JUMP,
  VICTORY,
  TORCH_IDLE,
  TILEMAP_HOME,
  TILEMAP_ABOUT,
  TILEMAP_SKILLS,
  TILEMAP_PROJECTS,
  TILEMAP_CONTACT,
  HOME_BACKGROUND,
  ABOUT_ENTRANCE,
  SKILLS_ENTRANCE,
  PROJECTS_ENTRANCE,
  DOORWAY,
  BOOKSTACK,
  INTERACT_ICON,
  CHEST,
  KEY,
  TORCH,
  CONTACT_ENTRANCE
} from "../../system/consts";

export default ({
  sceneKey,
  onBootCreation = () => {},
  onJumpPressed = () => {},
  onArrowPressed = () => {},
  onInteractPressed = () => {}
}) => {
  function preload() {
    // To work out tiled application world size: n / tileSize / zoom (example: 600 / 8 / 4)
    // load in JSON data for tile placement
    this.load.tilemapTiledJSON(TILEMAP_HOME, tiledMapJSONHome);
    this.load.tilemapTiledJSON(TILEMAP_ABOUT, tiledMapJSONAbout);
    this.load.tilemapTiledJSON(TILEMAP_SKILLS, tiledMapJSONExperience);
    this.load.tilemapTiledJSON(TILEMAP_PROJECTS, tiledMapJSONProjects);
    this.load.tilemapTiledJSON(TILEMAP_CONTACT, tiledMapJSONContact);

    // must match tileset names below
    this.load.image(BASE_TILES, tilesGraphic);

    // spritesheets
    this.load.spritesheet(PLAYER, playerGraphic, {
      frameWidth: 16,
      frameHeight: 27
    });

    this.load.spritesheet(CHEST, chestGraphic, {
      frameWidth: 18,
      frameHeight: 14
    });

    this.load.spritesheet(INTERACT_ICON, interactGraphic, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(TORCH, torchGraphic, {
      frameWidth: 7,
      frameHeight: 22
    });

    this.load.spritesheet(CONTACT_ENTRANCE, contactEntranceGraphic, {
      frameWidth: 148,
      frameHeight: 71
    });

    // other assets
    this.load.image(HOME_BACKGROUND, homeBackground);
    this.load.image(ABOUT_ENTRANCE, aboutEntranceGraphic);
    this.load.image(SKILLS_ENTRANCE, experienceEntranceGraphic);
    this.load.image(PROJECTS_ENTRANCE, projectsEntranceGraphic);
    this.load.image(DOORWAY, doorwayGraphic);
    this.load.image(BOOKSTACK, bookstackGraphic);
    this.load.image(KEY, keyGraphic);
  }

  function create() {
    // anims
    this.anims.create({
      key: IDLE,
      frames: this.anims.generateFrameNumbers(PLAYER, { frames: [0, 1] }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: WALK,
      frames: this.anims.generateFrameNumbers(PLAYER, {
        frames: [2, 3, 4, 5, 6, 5, 4, 3]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key: JUMP,
      frames: this.anims.generateFrameNumbers(PLAYER, {
        frames: [3]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key: FALL,
      frames: this.anims.generateFrameNumbers(PLAYER, {
        frames: [5]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key: VICTORY,
      frames: this.anims.generateFrameNumbers(PLAYER, {
        frames: [6, 7, 8, 7, 6]
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create(
      {
        key: TORCH_IDLE,
        frames: this.anims.generateFrameNumbers(TORCH, {
          frames: [0, 1, 2, 3]
        }),
        frameRate: 8,
        repeat: -1
      },
      true
    );

    // bindings
    const cursors = this.input.keyboard.createCursorKeys();

    cursors.up.on(
      InputEvents.DOWN,
      function() {
        onJumpPressed();
      },
      this
    );

    cursors.right.on(
      InputEvents.UP,
      function() {
        onArrowPressed(0);
      },
      this
    );

    cursors.left.on(
      InputEvents.UP,
      function() {
        onArrowPressed(0);
      },
      this
    );

    this.input.keyboard.on(
      InputEvents.INTERACT_KEY,
      function(event) {
        onInteractPressed();
      },
      this
    );

    // on created
    onBootCreation({
      cursors,
      startPoints: {
        left: {
          x: 0,
          y: 0
        },
        right: {
          x: 0,
          y: 0
        }
      }
    });
  }

  return {
    key: sceneKey,
    preload: preload,
    create: create
  };
};
