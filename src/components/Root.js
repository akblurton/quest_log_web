import React from "react";
import PropTypes from "prop-types";
import { StyleSheetManager } from "styled-components";
import { Provider } from "react-redux";
import store from "../store";

import Style from "../style/css";
import { ThemeProvider } from "../style/ThemeProvider";
import SkeletonTheme from "../style/Skeleton";
import Logo from "./Branding/Logo";
import DarkModeToggle from "./UI/DarkModeToggle";
import Router from "./Router";
import { client, URQLProvider } from "../urql";

import useLocalStorage from "~/hooks/localStorage";

const Root = ({ Router: R, url }) => {
  const [dark, setDark] = useLocalStorage(
    "dark_mode",
    () =>
      global.matchMedia &&
      !!global.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <URQLProvider value={client}>
      <StyleSheetManager disableVendorPrefixes>
        <ThemeProvider>
          <SkeletonTheme>
            <Provider store={store}>
              <DarkModeToggle dark={dark} onChange={setDark} />
              <Style />
              <Logo>Video Game Journal</Logo>
              <Router Router={R} url={url} />
            </Provider>
          </SkeletonTheme>
        </ThemeProvider>
      </StyleSheetManager>
    </URQLProvider>
  );
};

Root.propTypes = {
  Router: PropTypes.func,
  url: PropTypes.string,
};

export default Root;
