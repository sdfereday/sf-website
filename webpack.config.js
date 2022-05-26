const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  // Environment mode
  mode: "production",
  //mode: "development",

  // Entry point of app
  entry: resolveAppPath("src"),

  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
  },

  devServer: {
    // Serve index.html as the base
    contentBase: resolveAppPath("public"),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 3000,

    // Public path is root of content base
    publicPath: "/",

    proxy: {
      "/api/bypass-example": {
        bypass: (req, res) =>
          res.send({
            mssg: "proxy server - Message came from bypass property in webpack"
          })
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"]
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: resolveAppPath("public/index.html"),
      favicon: resolveAppPath("public/favicon.ico")
    })
  ]
};
