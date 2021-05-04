const { loaderByName, addBeforeLoader } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const jsonLinesLoader = {
        test: [
          require.resolve("./src/data/corrections_monthly.json"),
          require.resolve("./src/data/corrections_annual.json"),
        ],
        use: "jsonlines-loader",
        type: "javascript/auto",
      };

      addBeforeLoader(webpackConfig, loaderByName("file-loader"), jsonLinesLoader);

      return webpackConfig;
    },
  },
};
