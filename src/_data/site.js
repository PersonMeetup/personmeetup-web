"use strict";

const eleventyPackage = require("@11ty/eleventy/package.json");

module.exports = function () {
	return {
		generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
		title: "Person Meetup",
		url: "https://personmeetup.ca",
		language: "en",
		description:
			"Leslie “Person Meetup” Swan is a multidisciplinary Canadian designer with a focus in New-Media.",
		image: "/assets/opengraph.png",
		author: {
			name: "Leslie Swan",
			email: "contact@personmeetup.ca",
			url: "https://personmeetup.ca/#about",
		},
	};
};
