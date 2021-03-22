require("source-map-support").install();
require("dotenv").config();

import "isomorphic-fetch";
const { env, ...options } = require("yargs").argv;
import path from "path";
import Koa from "koa";
import e2k from "express-to-koa";
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import prepass from "react-ssr-prepass";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";
import koaStatic from "koa-static";
import koaMount from "koa-mount";
import koaLogger from "koa-logger";

const STATIC_PATH = "/static/";
async function start() {
  const app = new Koa();
  app.use(koaLogger());
  if (process.env.NODE_ENV === "development") {
    const proxy = require("koa-proxy");
    app.use(
      proxy({
        host: "http://localhost:4000",
        match: /^\/api/,
      })
    );
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.config.js");
    const middleware = require("webpack-dev-middleware");
    const hotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig(env, options));
    const wpMiddleware = middleware(compiler, {
      publicPath: STATIC_PATH,
      serverSideRender: true,
      writeToDisk(filePath) {
        return (
          /loadable-stats/.test(filePath) || /dist(\/||\\)node/.test(filePath)
        );
      },
    });
    app.use(e2k(wpMiddleware));
    app.use(e2k(hotMiddleware(compiler.compilers[0])));
  } else {
    app.use(
      koaMount(
        STATIC_PATH,
        koaStatic(path.resolve(__dirname, "../dist/web/"), {
          defer: false,
        })
      )
    );
  }

  const nodeStats = path.resolve(
    __dirname,
    "../dist/node/.loadable-stats.json"
  );
  const webStats = path.resolve(__dirname, "../dist/web/.loadable-stats.json");
  app.use(async function devSSR(ctx) {
    const nodeExtractor = new ChunkExtractor({
      statsFile: nodeStats,
    });
    const {
      default: App,
      graphql,
      themeHydration,
    } = nodeExtractor.requireEntrypoint();

    const sheet = new ServerStyleSheet();
    const webExtractor = new ChunkExtractor({
      statsFile: webStats,
    });

    const element = <App Router={StaticRouter} url={ctx.URL.pathname} />;
    await prepass(webExtractor.collectChunks(sheet.collectStyles(element)));

    const qlData = Buffer.from(
      JSON.stringify(graphql.extractData()),
      "utf-8"
    ).toString("base64");
    const jsx = element;
    try {
      const html = renderToString(webExtractor.collectChunks(jsx));
      ctx.type = "text/html";
      ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <title>Quest Log</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700&display=swap" rel="stylesheet">
            ${webExtractor.getLinkTags()}
            ${webExtractor.getStyleTags()}
            ${sheet.getStyleTags()}
          </head>
          <body>
            <script>${themeHydration}</script>
            <script>window.__URQL_DATA__ = "${qlData}"</script>
            <div id="main">${html}</div>
            ${webExtractor.getScriptTags()}
          </body>
        </html>
      `.trim();
    } catch (e) {
      console.error(e);
      ctx.body = "Error";
      ctx.status = 500;
    } finally {
      sheet.seal();
    }
  });
  app.listen(3000);
}

start();
