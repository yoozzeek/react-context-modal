module.exports = () => {
  return {
    plugins: [
      require("autoprefixer")(),
      require("postcss-combine-media-query"),
      require("postcss-combine-duplicated-selectors"),
      require("postcss-prettify"),
    ],
  };
};
