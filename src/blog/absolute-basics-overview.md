---
title: The Absolute Basics of Web Development - Overview
description: People seem to be more interested in building for the web these days. Here's how you get started with that.
tags:
  - Web-Design
  - Programming
  - Tutorial
layout: layouts/post.njk
---

Recently, I've been seeing a growing interest from my friends about learning how to make their own websites. This isn't too surprising given [the current dumpster fire that is Twitter](https://twitterisgoinggreat.com/), not to mention the thousands of layoffs coming from big tech companies. Beyond the usual suspects like Facebook and Google, there's also growing frustration coming from more specialized web platforms. [Meg Syverud](https://www.megsyverud.com/) shot out a warning to others artists a while ago about having WebToons and Tapas being the sole hosts of one's webcomic.

> “If you're an aspiring comic/webcomic artist or author, your first choices should NEVER EVER EVER EVER EVER be Webtoons or Tapas. Ever.
>
> You should never aspire to have a contract with those leeches. Have Mirror/Secondary sites set up on them, but do not EVER attach the worth of your career to the acknowledgement of a corporation. Ever.” -- [Source](https://twitter.com/bludragongal/status/1631139667977584640)

Of course, WebToons and Tapas screwing over artists isn't too surprising when you consider how similar they are to other social media platforms. At their core, all platforms boil down to being [a garage that some else owns](https://xkcd.com/1150/). Now, this isn't to say there's anything bad about storing stuff in someone else's garage; sometimes it's the more practical option if you can't use your own. The trouble comes from when you become dependent on the garage owner to store your stuff. In that case, you're trusting them not to pawn over your stuff to someone else or, worse yet, to just [dump it in the trash](https://www.matuzo.at/blog/2022/your-account-is-permanently-suspended/). Sadly, that's become the reality of using social media these days.

Given these circumstances (and how a few of my friends have asked for help with HTML), I've decided to start a series of posts where I'd talk about web design concepts that I believe are worthwhile to know of. I recognize, however, that I'm very much in the deep end when it comes to web development. Much of what I consider significant might not matter to you. If that's the case, feel free to jump off and blaze your own trail! Part of what makes the web so interesting is all the weird content on it, so don't be afraid to experiment on your own! With all that said, let's get some groundwork down.

## Making a Website

One thing I've often heard my friends say in reference to making their own sites is how they “want to make their own Neocities.” At risk of sounding like a [GNU/Linux purist](https://stallman-copypasta.github.io/), I do think it's important to clarify what exactly Neocities is, especially given what happened to the thousands of sites that were hosted on its namesake, [Geocities](https://www.howtogeek.com/692445/remembering-geocities-the-1990s-precursor-to-social-media/). [Neocities](https://neocities.org/) isn't a service like [Carrd](https://carrd.co/) that you use to build a site, but rather is a _host_ for your website.

At their core, websites are HTML files that are accessed through a browser. That means that any HTML file could be a website, so long as it's uploaded to a server that broadcasts it onto the web. When you use a service like Neocities for your website, you're uploading your website's code to a server, referred to as a web host, which then makes said code accessible on the internet. There are a variety of options as to how you can host your website, whether you use someone else's servers [or use your own](https://landchad.net/); they all function more or less the same.

The reason I bring this all up is that Neocities is not another platform, it is one of a countless amount of web hosting providers. When you make a website on Neocities, you're making your own personal site; a site where you control everything from its infrastructure to how it's presented. This isn't to discredit Neocities as it's a great web host, and I'll be assuming you're using it as I go through this series. This is all to say that [if Neocities dies](https://indieweb.org/site-deaths), your site would still go on, just as long as another server is pointing from the same direction[^1].

[^1]: To elaborate on this, as long as a server is still hosting your website from the same web address, you can use any hosting provider you want. I realize that in the hypothetical I gave that a site could not continue if it was under a Neocities subdomain, but that's jumping into a discussion on domain names, which is a topic for another time.

## Rubber on the Markup

Now we come to the real meat and potatoes: coding your own website. If you're learning HTML from scratch, you're likely overwhelmed by the variety of options to choose from. Even Neocities [lists a variety of HTML tutorials alongside their own course](https://neocities.org/tutorials). I'm not going to add onto that choice paralysis, especially because HTML's basics have been so well covered by others before me. Instead, I'm going to suggest checking out the University of Waterloo's OpenCS course on [web basics](https://open.cs.uwaterloo.ca/web-basics/). This was the course I personally followed to learn about how HTML worked, and I found it gave me a strong foundation to build on. They also have a [web programming](https://open.cs.uwaterloo.ca/web-programming/) course for those wanting to dab their feet into JavaScript. Even if you're not interested in scripting just yet, it might still be worth taking a look as it gives you a better understanding as to how webpages are structured.

For those who want something a bit more engaging to learn from, I turn you towards [Life of Boris's](https://www.youtube.com/@LifeofBoris) extra high quality set of web development tutorials. He covers all the fundamentals of [HTML](https://www.youtube.com/watch?v=ttcOHNlNKPE), [CSS](https://www.youtube.com/watch?v=-bYTGvHRbDs), and [JavaScript](https://www.youtube.com/watch?v=8OaCcw_0LIw) in ~10 minute chunks. Ultimately, the best way to learn is to get your hands dirty with markup. Once you've spent some time getting familiar with how HTML and CSS work at a basic level, you're functionally able to make whatever page you want. If you want a challenge to apply what you've learned, [try making a fansite](https://bryanlrobinson.com/blog/bring-fansites-back-to-the-web/) to some piece of media you enjoy. As long as you keep developing and working on your website, you'll learn how to code.

## Information Architecture

Even as you're still learning how to use HTML, one thing you should be considering is what the purpose of your site is going to be. Are you making a blog that's all about your interests, or will it be a gallery to show off your work? What type of person are you expecting to visit your site? How are they going to navigate it? These questions all go into the information architecture of your site, which forms the base of how your site is organized.

The most important aspect when thinking about how to organize your site is knowing what its contents are going to be. Take some time to think about this, writing down anything that comes to mind. I suggest doing this physically with each idea on its own index card (or similar size), because once you're done, you can easily group those ideas together in a way that feels best to you. Finally, label those groups you've created. You've just created the structure for your site.

![A bunch of paper cut outs, organized by content type and labeled.](src/assets/blog/absolute-basics-overview/Site-CardSorting.jpg "Here's the cards I made when I was coming up with the structure of my own site!")

If you're approaching this exercise with a focus on the user experience, you should go one layer deeper and think about the hierarchy of the presented information; what should be “above the fold” when the user loads the page? If you're approaching this from a more personal angle, you have everything you need already. At this point, it comes down to refining those cards into the sections and pages of your site. For this, consider making a sitemap that leads from the homepage to all the different sections of the site. Of course, not every page has to follow an organizational structure; an obvious example being secret links. Still, having a general structure to your site definitely makes things easier development wise, as it gives you a plan on how to approach building it.

## Wrapping Up

That pretty much covers everything I'd consider essential information on web development. You have some good resources on learning HTML, and you're considering how you want your site to be structured. That's pretty much all you need, now it just comes down to putting it into practice. So go, try making something on the web. Whether it be a [personal site](https://matthiasott.com/articles/into-the-personal-website-verse) or a [shrine dedicated to your favourite streamer](https://fear.garden/jerma/), you'll be carving your own corner in this incredible web that we've made for ourselves.

Make your own digital spaces. Make them welcoming. Make them informative. But most of all, make them interesting.

---

I'm assuming that if you're reading up to this point, you're looking to see what other tidbits of web knowledge I have. In that case, thanks for sticking around! Next time I plan on talking about some tools you can use when building your site, so [keep an eye peeled for that](/feeds/).
