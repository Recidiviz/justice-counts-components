const { loaderByName, addBeforeLoader } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const jsonLinesLoader = {
        test: /\.jsonl$/,
        use: "jsonlines-loader",
        type: "javascript/auto",
      };

      addBeforeLoader(webpackConfig, loaderByName("file-loader"), jsonLinesLoader);

      return webpackConfig;
    },
  },
};
