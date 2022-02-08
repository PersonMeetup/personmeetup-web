const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Portions of code sourced from https://github.com/11ty/eleventy-base-blog
module.exports = function(eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);
    
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Parse markdown referenced within nunjucks
    eleventyConfig.addPairedShortcode("markdown", function(content) {
        return markdownIt().render(content);
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

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
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

    // Customize Markdown library and settings:
    eleventyConfig.setLibrary("md", markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }));

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