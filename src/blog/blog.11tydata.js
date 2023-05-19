const gitLastUpdated = require("@11ty/eleventy/src/Util/DateGitLastUpdated");

module.exports = {
	tags: ["blog", "archive"],
	layout: "layouts/post.njk",
	date: "git Created",
	eleventyComputed: {
		lastmod: ({ page }) => gitLastUpdated(page.inputPath),
	},
};
