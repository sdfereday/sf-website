import tiledMapJSONHome from "../assets/map-home.json";
import tiledMapJSONAbout from "../assets/map-about.json";
import tiledMapJSONExperience from "../assets/map-experience.json";
import tiledMapJSONProjects from "../assets/map-projects.json";
import tiledMapJSONContact from "../assets/map-contact.json";
import tilesGraphic from "../assets/environment_tiles.png";
import playerGraphic from "../assets/player.png";
import doorwayGraphic from "../assets/doorway.png";
import homeEntranceGraphic from "../assets/home_entrance.png";
import aboutEntranceGraphic from "../assets/about_entrance.png";
import experienceEntranceGraphic from "../assets/experience_entrance.png";
import projectsEntranceGraphic from "../assets/projects_entrance.png";
import contactEntranceGraphic from "../assets/contact_entrance.png";
import bookstackGraphic from "../assets/bookstack.png";
import exitGraphic from "../assets/exit.png";
import interactGraphic from "../assets/interact.png";

export default ({
  onBootCreation = () => {},
  onJumpPressed = () => {},
  onArrowPressed = () => {},
  onInteractPressed = () => {}
}) => {
  function preload() {
    // To work out tiled application world size: n / tileSize / zoom (example: 600 / 8 / 4)
    // load in JSON data for tile placement
    this.load.tilemapTiledJSON("tilemap_home", tiledMapJSONHome);
    this.load.tilemapTiledJSON("tilemap_about", tiledMapJSONAbout);
    this.load.tilemapTiledJSON("tilemap_skills", tiledMapJSONExperience);
    this.load.tilemapTiledJSON("tilemap_projects", tiledMapJSONProjects);
    this.load.tilemapTiledJSON("tilemap_contact", tiledMapJSONContact);

    // must match tileset names below
    this.load.image("base_tiles", tilesGraphic);

    // player animations
    this.load.spritesheet("player", playerGraphic, {
      frameWidth: 16,
      frameHeight: 27
    });

    // other assets
    this.load.image("doorway", doorwayGraphic);
    this.load.image("homeEntranceGraphic", homeEntranceGraphic);
    this.load.image("aboutEntranceGraphic", aboutEntranceGraphic);
    this.load.image("experienceEntranceGraphic", experienceEntranceGraphic);
    this.load.image("projectsEntranceGraphic", projectsEntranceGraphic);
    this.load.image("contactEntranceGraphic", contactEntranceGraphic);
    this.load.image("bookstack", bookstackGraphic);
    this.load.image("exit", exitGraphic);
    this.load.image("interact", interactGraphic);
  }

  function create() {
    // anims
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 1] }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [3, 4, 5, 6, 7, 6, 5, 4]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [6]
      }),
      frameRate: 16,
      repeat: -1
    });

    // bindings
    const cursors = this.input.keyboard.createCursorKeys();

    cursors.up.on(
      "down",
      function() {
        onJumpPressed();
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

    this.input.keyboard.on(
      "keydown-E",
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
    key: "boot",
    preload: preload,
    create: create
  };
};
