import { createGlobalStyle } from "styled-components";

import { THEME, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from "./theme";
import reset from "./reset";

const Style = createGlobalStyle`
  ${reset}
  :root {
    ${Object.entries(THEME)
    .map(([type, variables]) =>
      Object.entries(variables)
        .map(([name, { light }]) => `--${type}-${name}: ${light};`)
        .join("")
    )
    .join("")}
  }
  body {
    background: var(--color-background);
    color: var(--color-foreground);
    font-family: 'Roboto Slab', serif;
    font-weight: 300;
    line-height: 1.4;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
`;

// Adapted from https://github.com/joshwcomeau/dark-mode-minimal/blob/e08c874accdbfc2237054cf059571c8c87d25a83/gatsby-ssr.js
function setColorsByTheme() {
  const theme = "🌈";
  const colorModeKey = "🔑";
  const colorModeCssProp = "⚡️";

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDarkFromMQ = mql.matches;
  const prefersDarkFromLocalStorage = localStorage.getItem(colorModeKey);

  let colorMode = "light";

  const hasUsedToggle = typeof prefersDarkFromLocalStorage === "string";

  if (hasUsedToggle) {
    colorMode = prefersDarkFromLocalStorage;
  } else {
    colorMode = prefersDarkFromMQ ? "dark" : "light";
  }

  let root = document.documentElement;

  root.style.setProperty(colorModeCssProp, colorMode);

  for (const [type, variables] of Object.entries(theme)) {
    for (const [name, valueByTheme] of Object.entries(variables)) {
      const cssVarName = `--${type}-${name}`;
      root.style.setProperty(cssVarName, valueByTheme[colorMode]);
    }
  }
}

const scriptJS = String(setColorsByTheme)
  .replace(`"🌈"`, JSON.stringify(THEME)) // eslint-disable-line
  .replace("🔑", COLOR_MODE_KEY)
  .replace("⚡️", INITIAL_COLOR_MODE_CSS_PROP);

const calledJS = `(${scriptJS})()`;
export { calledJS };
export default Style;
