const fs = require("fs");
const htmlmin = require("html-minifier");
const { DateTime } = require("luxon");
const { readdir } = require("fs/promises");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const markdownItAnchor = require("markdown-it-anchor");
const markdownItBiblatex = require("@arothuis/markdown-it-biblatex");
const markdownIt = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-sup"))
	.use(require("markdown-it-mark"))
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
	})
	.use(require("markdown-it-toc-done-right"))
	.use(markdownItBiblatex, {
		bibPath: "./src/_data/citations.bib",
		stylePath: "./src/_data/modern-language-association.csl",
		bibliographyMark: "[bibliography]",
		bibliographyTitle:
			'<h2 id="bibliography" tabindex="-1"><a class="header-anchor" href="#bibliography">Bibliography</a></h2>',
		bibliographyContentsWrapper: "ul",
		bibliographyEntryWrapper: "li",
	});

const eleventyNav = require("@11ty/eleventy-navigation");
const eleventyRSS = require("@11ty/eleventy-plugin-rss");
const eleventySyntax = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
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
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(eleventySass);

	// Parse markdown referenced within nunjucks
	eleventyConfig.addPairedShortcode("markdown", function (content) {
		return markdownIt.render(content);
	});

	eleventyConfig.addPairedShortcode("info", function (content) {
		return `<div class="info">
							<figure>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
									<path fill="currentColor" d="M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
								</svg>
								<figcaption>Information</figcaption>
							</figure>
							${markdownIt.render(content)}</div>\n`;
	});

	eleventyConfig.addPairedShortcode("constructiton", function (content) {
		return `<div class="construction">
							<img src="src/assets/wip.gif" alt="UNDER CONSTRUCTION">
							${markdownIt.render(content)}</div>\n`;
	});

	eleventyConfig.addAsyncShortcode("image", imageShortcode);

	eleventyConfig.addAsyncShortcode("currate", async function (target) {
		target = target.toLowerCase();
		try {
			const files = await readdir("./src/_includes/currate");
			// If file found in _includes/currate, import into document
			for (const file of files) {
				if (file.startsWith(target)) {
					const targetData = fs.readFileSync(
						`./src/_includes/currate/${target}.md`,
						"utf8"
					);
					return `<article><details class="context" open="true"><summary class="context-button">Toggle Curation</summary><div class="context-details">${markdownIt.render(
						targetData
					)}</div></details></article>`;
				}
			}
			return "";
		} catch (err) {
			return "";
		}
	});

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

	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true,
			});
			return minified;
		}
		return content;
	});

	/**
	 * Copy over required files
	 */

	// Copy media folders to the output
	eleventyConfig.addPassthroughCopy("./src/assets/index");
	eleventyConfig.addPassthroughCopy("./src/links");
	eleventyConfig.addPassthroughCopy("./src/fonts");
	eleventyConfig.addPassthroughCopy("./src/js");
	eleventyConfig.addPassthroughCopy({ "./src/favicon": "/" });

	// Copy robots.txt to output
	eleventyConfig.addPassthroughCopy("./src/robots.txt");

	// Copy feed.xsl to output
	eleventyConfig.addPassthroughCopy("./src/feeds/feed.xsl");

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

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
