'use strict';

const eleventyPackage = require('@11ty/eleventy/package.json');

module.exports = function () {
  return {
    generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
    title: "Person Meetup",
    url: "https://personmeetup.neocities.org/",
    language: "en",
    description: "I like to create stuff",
    feed: {
        subtitle: "I like to create stuff",
        filename: "feed.xml",
        path: "/feed.xml",
        id: "https://personmeetup.neocities.org/"
      },
    author: {
        name: "Leslie Swan",
        email: "myemailaddress@notyet.com",
        url: "https://personmeetup.neocities.org/#about"
    }
  };
};
