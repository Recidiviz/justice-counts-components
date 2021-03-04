const { loaderByName, addBeforeLoader } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const jsonLinesLoader = {
        test: [
          require.resolve("./src/data/corrections_data.json"),
          require.resolve("./src/data/jails_data.json"),
          require.resolve("./src/data/counties_data.json"),
        ],
        use: "jsonlines-loader",
        type: "javascript/auto",
      };

      addBeforeLoader(webpackConfig, loaderByName("file-loader"), jsonLinesLoader);

      return webpackConfig;
    },
  },
};
