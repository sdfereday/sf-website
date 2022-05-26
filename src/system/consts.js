/* Scenes & Pages */
export const BOOTKEY = "hoot";
export const HOMEKEY = "home";
export const ABOUTKEY = "about";
export const SKILLSKEY = "skills";
export const PROJECTSKEY = "projects";
export const CONTACTKEY = "contact";

export const HOMEINDEX = 0;
export const ABOUTINDEX = 1;
export const SKILLSINDEX = 2;
export const PROJECTSINDEX = 3;
export const CONTACTINDEX = 4;

export const SCENEKEYS = [
  HOMEKEY,
  ABOUTKEY,
  SKILLSKEY,
  PROJECTSKEY,
  CONTACTKEY
];

/* Events */
export const GAME_INSTANCE_KEY = "gameInstance";
export const GameEvents = {
  ARROW_PRESSED: "arrowPressed",
  DOORWAY_ENTERED: "doorwayEntered",
  INTERACT_PRESSED: "interactPressed",
  CAMERA_FADED_OUT: "camerafadeoutcomplete"
};
export const InputEvents = {
  UP: "up",
  DOWN: "down",
  INTERACT_KEY: "keydown-E"
};

/* Properties */
export const PAGE_TRANSITION_DURATION = 500;
export const SCENE_TRANSITION_DURATION = 200;
export const NEUTRAL = 0;
export const LEFT = -1;
export const RIGHT = 1;

/* Layers & Tiles */
export const BASE_TILES = "base_tiles";
export const REAR = "Rear";
export const BASE = "Base";
export const FRONT = "Front";
export const POSITIONING = "Positioning";
export const TILEMAP_HOME = "tilemap_home";
export const TILEMAP_ABOUT = "tilemap_about";
export const TILEMAP_SKILLS = "tilemap_skills";
export const TILEMAP_PROJECTS = "tilemap_projects";
export const TILEMAP_CONTACT = "tilemap_contact";
export const LEFT_START = "leftStart";
export const RIGHT_START = "rightStart";

/* Sprites */
export const PLAYER = "player";
export const EXIT = "exit";
export const DOORWAY = "doorway";
export const HOME_BACKGROUND = "homeBackground";
export const ABOUT_ENTRANCE = "aboutEntranceGraphic";
export const SKILLS_ENTRANCE = "experienceEntranceGraphic";
export const PROJECTS_ENTRANCE = "projectsEntranceGraphic";
export const CONTACT_ENTRANCE = "contactEntranceGraphic";
export const BOOKSTACK = "bookstack";
export const INTERACT_ICON = "interact";

/* Animations */
export const WALK = "walk";
export const IDLE = "idle";
export const FALL = "fall";
export const JUMP = "jump";

/* Transitions */
export const SINE_EASEINOUT = "Sine.easeInOut";
