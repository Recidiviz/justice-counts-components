const { loaderByName, addBeforeLoader } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions.push(".jsonl");

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
