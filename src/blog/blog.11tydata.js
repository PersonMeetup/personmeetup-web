const gitLastUpdated = require("@11ty/eleventy/src/Util/DateGitLastUpdated");

module.exports = {
	tags: ["blog", "archive"],
	eleventyComputed: {
		date: "git Created",
		lastmod: ({ page }) => gitLastUpdated(page.inputPath),
	},
};
