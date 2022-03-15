const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const markdownIt = require("markdown-it")({
                      html: true,
                      breaks: true,
                      linkify: true
                    })  
                    .use(require("markdown-it-footnote"))
                    .use(require("markdown-it-mark"))
                    .use(markdownItAnchor,{
                      permalink: markdownItAnchor.permalink.headerLink()
                    })
                    .use(require("markdown-it-table-of-contents"),{
                      includeLevel: [2,3,4,5,6]
                    });
const eleventyNav = require("@11ty/eleventy-navigation");
const eleventyRSS = require("@11ty/eleventy-plugin-rss");
const eleventySyntax = require("@11ty/eleventy-plugin-syntaxhighlight");

const eleventyImg = require("@11ty/eleventy-img");

// Portions of code sourced from https://github.com/11ty/eleventy-base-blog
module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
    
  eleventyConfig.addPlugin(eleventyNav);
  eleventyConfig.addPlugin(eleventyRSS);
  eleventyConfig.addPlugin(eleventySyntax);

  // Parse markdown referenced within nunjucks
  eleventyConfig.addPairedShortcode("markdown", function(content) {
    return markdownIt.render(content);
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    if (typeof dateObj === 'string') {
      return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    }
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });
  eleventyConfig.addFilter("readableDate", dateObj => {
    if (typeof dateObj === 'string') {
      return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    }
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "blog"].indexOf(tag) === -1);
  }
  eleventyConfig.addFilter("filterTagList", filterTagList);

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Copy media folders to the output
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/favicon": "/"});

  // Customize Markdown library and settings:
  eleventyConfig.setLibrary("md", markdownIt);

  return {
    markdownTemplateEngine: "njk",
    HTMLTemplateEngine: "njk",
    dataTemplateEngine: false,
    dir: {
      input: "src",
      output: "dist"
    }
  };
};