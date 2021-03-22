const COLOR_MODE_KEY = "color-mode";
const INITIAL_COLOR_MODE_CSS_PROP = "--initial-color-mode";

import darkLogo from "#/img/logos/game_journal_dark.png";
import lightLogo from "#/img/logos/game_journal_light.png";

const THEME = {
  color: {
    background: {
      light: "#a8aaaa",
      dark: "#111111",
    },
    "background-alt": {
      light: "#989a9a",
      dark: "#222222",
    },
    foreground: {
      light: "#080907",
      dark: "#C1BED1",
    },
    skeleton: {
      light: "#C1BED1",
      dark: "#000000",
    },
    "skeleton-highlight": {
      light: "#D1CEE1",
      dark: "#0b0d12",
    },
    primary: {
      light: "#eb1a1d",
      dark: "#069330",
    },
    secondary: {
      light: "#0749b4",
      dark: "#FFC001",
    },
    tertiary: {
      light: "#fece15",
      dark: "#011DA9",
    },
  },
  image: {
    logo: {
      light: `url("${lightLogo}")`,
      dark: `url("${darkLogo}")`,
    },
  },
};

export { THEME, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP };
