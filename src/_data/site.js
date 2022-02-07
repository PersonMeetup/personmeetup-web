'use strict';

const eleventyPackage = require('@11ty/eleventy/package.json');

module.exports = function () {
  return {
    generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
    title: "Person Meetup",
    url: "https://personmeetup.neocities.org/",
    language: "en",
    description: "Bap",
    feed: {
        subtitle: "Bap",
        filename: "feed.xml",
        path: "/feed/feed.xml",
        id: "https://example.com/"
      },
    jsonfeed: {
        path: "/feed/feed.json",
        url: "https://example.com/feed/feed.json"
      },
    author: {
        name: "Leslie Swan",
        email: "youremailaddress@example.com",
        url: "https://example.com/about-me/"
    }
  };
};
