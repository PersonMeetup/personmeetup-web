const { DateTime } = require("luxon");
const cheerio = require("cheerio");
var hljs = require("highlight.js");

const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require("markdown-it-container");
const markdownIt = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					`<pre class="language-${lang}"><code>` +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					"</code></pre>"
				);
			} catch (__) {}
		}

		return (
			`<pre class="language-${lang}"><code>` +
			markdownIt.utils.escapeHtml(str) +
			"</code></pre>"
		);
	},
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-mark"))
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
	})
	.use(require("markdown-it-table-of-contents"), {
		includeLevel: [2, 3, 4, 5, 6],
	})
	.use(markdownItContainer, "info", {
		render: function (tokens, idx) {
			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<div class="info">
						<figure>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
								<path fill="currentColor" d="M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
							</svg>
							<figcaption>Information</figcaption>
						</figure>`;
			} else {
				// closing tag
				return "</div>\n";
			}
		},
	})
	.use(markdownItContainer, "construction", {
		render: function (tokens, idx) {
			if (tokens[idx].nesting === 1) {
				// opening tag
				return '<div class="construction"><img src="src/assets/wip.gif" alt="UNDER CONSTRUCTION">';
			} else {
				// closing tag
				return "</div>\n";
			}
		},
	});

const eleventyNav = require("@11ty/eleventy-navigation");
const eleventyRSS = require("@11ty/eleventy-plugin-rss");
const eleventySyntax = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventySass = require("eleventy-sass");
const eleventyImg = require("@11ty/eleventy-img");

/**
 * Markdown-It/Elevently Image Override
 
 * Shoutouts to Tomi Chen for figuring this out:
 * https://tomichen.com/blog/posts/20220416-responsive-images-in-markdown-with-eleventy-image/
 */

const widths = [320, 512, 710];
const eleventyImgOpts = {
	widths: widths
		.concat(widths.map((w) => w * 2)) // generate 2x sizes
		.filter((v, i, s) => s.indexOf(v) === i), // dedupe
	formats: ["avif", "jpeg"],
	outputDir: "dist/assets",
	urlPath: "/assets",
};

markdownIt.renderer.rules.image = function (tokens, idx, options, env, self) {
	function figure(html, caption) {
		return `<figure>${html}<figcaption>${caption}</figcaption></figure>`;
	}

	const token = tokens[idx];
	let imgSrc = token.attrGet("src");
	const imgAlt = token.content;
	const imgTitle = token.attrGet("title");

	const htmlOpts = {
		alt: imgAlt,
		loading: "lazy",
		decoding: "async",
	};

	eleventyImg(imgSrc, eleventyImgOpts);
	const metadata = eleventyImg.statsSync(imgSrc, eleventyImgOpts);

	const generated = eleventyImg.generateHTML(metadata, {
		sizes: "(max-width: 710px) 100vw, 710px",
		...htmlOpts,
	});

	if (imgTitle) {
		return figure(generated, imgTitle);
	}

	return generated;
};

// Refactor to merge code with markdownIt Image Override?
async function imageShortcode(
	src,
	alt,
	sizes = "(max-width: 710px) 100vw, 710px",
	loading = "lazy"
) {
	let metadata = await eleventyImg(src, eleventyImgOpts);

	let imageAttributes = {
		alt,
		sizes,
		loading,
		decoding: "async",
	};

	return eleventyImg.generateHTML(metadata, imageAttributes);
}

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

	eleventyConfig.setLibrary("md", markdownIt);

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
	eleventyConfig.addPassthroughCopy("src/assets/index");
	eleventyConfig.addPassthroughCopy("src/links");
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy({ "src/favicon": "/" });

	// Copy robots.txt to output
	eleventyConfig.addPassthroughCopy("src/robots.txt");

	// Copy feed.xsl to output
	eleventyConfig.addPassthroughCopy("src/feeds/feed.xsl");

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
