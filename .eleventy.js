const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const markdownIt = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-mark"))
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
	})
	.use(require("markdown-it-table-of-contents"), {
		includeLevel: [2, 3, 4, 5, 6],
	});
const eleventyNav = require("@11ty/eleventy-navigation");
const eleventyRSS = require("@11ty/eleventy-plugin-rss");
const eleventySyntax = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventySass = require("eleventy-sass");

// https://www.aleksandrhovhannisyan.com/blog/eleventy-image-lazy-loading/
const eleventyImg = require("@11ty/eleventy-img");
const path = require("path");

const imageShortcode = async (
	relativeSrc,
	alt,
	widths = [null, 400, 800],
	formats = ["jpeg", "webp"],
	sizes = "100vw"
) => {
	const { dir: imgDir } = path.parse(relativeSrc);
	const fullSrc = path.join("src", relativeSrc);

	const imageMetadata = await eleventyImg(fullSrc, {
		widths,
		formats,
		outputDir: path.join("dist", imgDir),
		urlPath: imgDir,
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	return eleventyImg.generateHTML(imageMetadata, imageAttributes);
};

// Portions of code sourced from https://github.com/11ty/eleventy-base-blog
module.exports = function (eleventyConfig) {
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addPlugin(eleventyNav);
	eleventyConfig.addPlugin(eleventyRSS);
	eleventyConfig.addPlugin(eleventySyntax);

	eleventyConfig.addPlugin(eleventySass);

	// Parse markdown referenced within nunjucks
	eleventyConfig.addPairedShortcode("markdown", function (content) {
		return markdownIt.render(content);
	});

	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Datetime Filters from https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "mst" }).toFormat(
			format || "DD"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "mst" }).toFormat("yyyy-LL-dd");
	});

	function filterTagList(tags) {
		return (tags || []).filter(
			(tag) =>
				["all", "nav", "blog", "portfolio", "archive"].indexOf(tag) === -1
		);
	}
	eleventyConfig.addFilter("filterTagList", filterTagList);

	// Create an array of all tags
	eleventyConfig.addCollection("tagList", function (collection) {
		let tagSet = new Set();
		collection.getAll().forEach((item) => {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		});

		return filterTagList([...tagSet]);
	});

	// Copy media folders to the output
	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/links");
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy({ "src/favicon": "/" });

	// Copy robots.txt to output
	eleventyConfig.addPassthroughCopy("src/robots.txt");

	// Copy feed.xsl to output
	eleventyConfig.addPassthroughCopy("src/feeds/feed.xsl");

	// Customize Markdown library and settings:
	eleventyConfig.setLibrary("md", markdownIt);

	return {
		markdownTemplateEngine: "njk",
		HTMLTemplateEngine: "njk",
		dataTemplateEngine: false,
		dir: {
			input: "src",
			output: "dist",
		},
	};
};
