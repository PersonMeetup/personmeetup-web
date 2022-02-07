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