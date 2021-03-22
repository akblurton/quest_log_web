/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const DashboardPlugin = require("webpack-dashboard/plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const devMode = options.mode !== "production";
  const createConfig = (target) => ({
    mode: devMode ? "development" : "production",
    name: target,
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
    entry: {
      main: [
        target === "web" && devMode && "webpack-hot-middleware/client",
        `./src/${target}.js`,
      ].filter(Boolean),
    },
    output: {
      filename: devMode ? "[name].js" : "[id].[contenthash].js",
      path: path.resolve(__dirname, "dist", target),
      publicPath: "/static/",
      ...(target === "web" ? {} : { libraryTarget: "commonjs2" }),
    },
    devtool:
      devMode && target === "web" ? "eval-cheap-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              caller: { target },
            },
          },
        },
        {
          test: /\.svg$/,
          type: "javascript/auto",
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "@svgr/webpack",
              options: {
                babel: false,
                replaceAttrValues: {
                  "#6c63ff": "currentColor",
                },
                dimensions: false,
              },
            },
            {
              loader: "url-loader",
              options: {
                limit: Math.pow(2, 10), // 1KB
                publicPath: "/static/",
                emitFile: target === "web",
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|webp|mp4|webm|gif)$/,
          type: "asset",
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        },
      ],
    },
    resolve: {
      modules: ["node_modules"],
      alias: {
        "#": path.resolve(__dirname, "assets"),
      },
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development",
      }),
      devMode && target === "web" && new webpack.HotModuleReplacementPlugin(),
      devMode && target === "web" && new DashboardPlugin({ port: 3001 }),
      devMode &&
        target === "web" &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: "whm",
          },
        }),
      new LoadablePlugin({
        filename: ".loadable-stats.json",
      }),
      new CleanWebpackPlugin({ verbose: true }),
    ].filter(Boolean),
    externals: target === "node" ? [nodeExternals()] : [],
    target,
  });

  return [createConfig("web"), createConfig("node")];
};
