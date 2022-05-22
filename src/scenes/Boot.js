import tiledMapJSONHome from "../assets/map-home.json";
import tiledMapJSONAbout from "../assets/map-about.json";
import tilesGraphic from "../assets/tiles.png";
import playerGraphic from "../assets/player.png";
import doorwayGraphic from "../assets/doorway.png";

export default () => {
  function preload() {
    console.log("Booting.");

    // To work out tiled application world size: n / tileSize / zoom (example: 600 / 8 / 4)
    // load in JSON data for tile placement
    this.load.tilemapTiledJSON("tilemap_home", tiledMapJSONHome);
    this.load.tilemapTiledJSON("tilemap_about", tiledMapJSONAbout);

    // must match tileset names below
    this.load.image("base_tiles", tilesGraphic);

    // player animations
    this.load.spritesheet("player", playerGraphic, {
      frameWidth: 16,
      frameHeight: 27
    });

    // other assets
    this.load.image("doorway", doorwayGraphic);
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
        frames: [3, 4, 5, 6, 7]
      }),
      frameRate: 16,
      repeat: -1
    });

    this.scene.start("home");
  }

  return {
    key: "boot",
    preload: preload,
    create: create
  };
};
