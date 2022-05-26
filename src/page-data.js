import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import {
  HOMEKEY,
  HOMEINDEX,
  ABOUTKEY,
  ABOUTINDEX,
  SKILLSKEY,
  SKILLSINDEX,
  PROJECTSKEY,
  PROJECTSINDEX,
  CONTACTKEY,
  CONTACTINDEX
} from "./consts";

export const HOME = {
  key: HOMEKEY,
  index: HOMEINDEX,
  pageComponent: <Home />
};

export const ABOUT = {
  key: ABOUTKEY,
  index: ABOUTINDEX,
  pageComponent: <About />
};

export const SKILLS = {
  key: SKILLSKEY,
  index: SKILLSINDEX,
  pageComponent: <Skills />
};

export const PROJECT = {
  key: PROJECTSKEY,
  index: PROJECTSINDEX,
  pageComponent: <Projects />
};

export const CONTACT = {
  key: CONTACTKEY,
  index: CONTACTINDEX,
  pageComponent: <Contact />
};

export default [HOME, ABOUT, SKILLS, PROJECT, CONTACT];
