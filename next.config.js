module.exports = () => {
  return {
    env: {
      CATEGORIES:
        process.env.CATEGORIES ||
        "headless,development,atomic-block,atomic-blocks",
      BLOGS: process.env.BLOGS || "https://torquemag.io,https://wpengine.com",
    },
  };
};
