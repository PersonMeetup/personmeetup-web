'use strict';

const eleventyPackage = require('@11ty/eleventy/package.json');

module.exports = function () {
  return {
    generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
    title: "Person Meetup",
    url: "https://personmeetup.ca",
    language: "en",
    description: "I like to create stuff",
    image: "/img/opengraph.png",
    feed: {
        subtitle: "I like to create stuff",
        filename: "feed.xml",
        path: "/feed.xml",
        id: "https://personmeetup.ca"
      },
    jsonfeed: {
        path: "/feed.json",
        url: "https://personmeetup.ca/feed.json"
      },
    author: {
        name: "Leslie Swan",
        email: "contact@personmeetup.ca",
        url: "https://personmeetup.ca/#about"
    }
  };
};
