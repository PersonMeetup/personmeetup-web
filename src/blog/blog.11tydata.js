const gitLastUpdated = require("@11ty/eleventy/src/Util/DateGitLastUpdated");

module.exports = {
	tags: ["blog", "archive"],
	date: "git Created",
	eleventyComputed: {
		lastmod: ({ page }) => gitLastUpdated(page.inputPath),
	},
};
