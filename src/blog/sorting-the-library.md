---
title: Sorting the Library
description: Continuing my digital organization, I tackle how my bookmarks are organized.
date: 2022-12-21
tags:
  - Meta
  - Technology
layout: layouts/post.njk
---
After surviving the last of my university assignments for the semester, I went back to work on my digital reorganization. I've spent the last few days working on my bookmarks, and I'm pretty happy with how it's looking at the moment. [Much like before](/blog/cleaning-the-mailboxes), I figured I'd write about how the process went.

## First Question: Why?

I've had a habit of bookmarking things ever since I was a kid. I'd overfill the bookmark bar with links to flash games and links to videos that made me laugh, often forgetting about the pages once they got carried away in the overflow. While many of those bookmarks have been lost to time, I've maintained the habit of keeping links to pages that I feel I may refer back to. I ended up going a step further this year, exporting my liked videos on YouTube into a bookmark file [via a janky python script I wrote](https://gist.github.com/PersonMeetup/b14fcdd1a1b924cd56cd413803654f49). While younger me acted on the desire to more easily get to Miniclip and funny Thomas the Tank Engine videos, these days I realize just how powerful having bookmarks is. 

Bookmarking lets you archive information that you deem most valuble, allowing you to recall it relatively ease. Both Chrome and Firefox come with functionality for searching your bookmarks right in the address bar, allowing for a more curated search if what you're doing is recalling information on a certain subject. An example I came across when contemplating swapping out my G213 keyboard for a "proper" mechanical one was finding an old Linus Tech Tips video on Romer-G switch manufacturing in my bookmarks. My browser, Firefox, saw me typing "Romer-G" and added links at the bottom of my search results that were bookmarks with the same terms used.

That functionality alone is powerful, but sometimes a manual search is needed. Maybe I know the topic field but I'm unsure about what exactly I'm looking for or, more commonly, what I'm looking for has a completely random title. In those cases, I was pretty much out of luck. My bookmarks were a disorganized array of links all over the place, with arbetrary decisions made about what goes where. That's still somewhat the case, but its drastically reduced from where it was previously.  Still, I've attempted to organize my bookmarks in the past, so what makes this attempt any different?

## Dew Inspiration

Much of my inspiration for how to organize my library of bookmarks was taken from the [Dewey Decimal System](https://www.oclc.org/content/dam/oclc/dewey/versions/print/intro.pdf)[^1], a method of sorting knowledge used by its subject. The general idea is that all knowledge is sorted under one of ten classes, which is further sorted into divisions and sections depending on the topic of discussion. In the actual system, this allows for books to be given "coordinates" that allow someone to find and retrieve the book they want from the shelves. For my library of bookmarks, however, I can fudge some of the typical standards that a library would need to follow and tailor things more to my needs.

[^1]: I feel it's important for me to acknoledge that Melvil Dewey, creator of the Dewey Decimal System, was [not a good person](https://youtu.be/KXJSjte_OAI?t=74).

The first way I tailored things was in how I defined my classes. I started off by jotting down the subjects and fields that were of most interest to me. After that, I tried to fit those subjects into broad fields that would group them all together. Those fields would become the classes of which everything falls under. There's still more refinement to be done - I'm adding classes when I find a group of bookmarks that would work better in their own field - but overall I'm happy with where my classes are at right now. For reference, here's what I currently have defined as my classes.

```md
Bookmarks
├── General Works
├── Art & Design
├── Electronic Technology
├── Engineering
├── Science
├── History
└── Entertainment
```

Note the `General Works` class; this catergory takes care of all the general articles that would be hard to fit elsewhere, such as news articles, philosophical discussions, opinion pieces and general essays. These would be referred to as devisions under the Dewey Decimal System.

```md
General Works
├── Essay
├── Opinion
├── Philosophy
├── Writing
├── Journalism
├── Organization
└── Recipes
```

From there, sections devide things further. It's worth mentioning that you can specify things further beyond sections (something which is a part of the actual system), but the core idea remains the same. This is all based off the idea of structural hierarchy; what is true of the whole is true for its parts. As an example, let's take a look at the folder structure within the `Art & Design` class.

```md
Art & Design
├── Graphic Design
├── Sound Design
│   ├── Sound Effects
│   ├── Synthesis
│   └── Music Production
├── Game Design
│   └── Level Design
├── Visual Art
│   ├── Drawing
│   └── Photography
├── Film & Video
├── Animation
└── 3D Modelling
```

If we look at the `Sound Design` folder, we see that structural hierarchy is applied both as a child of the root folder and as a parent. Everything that falls under the `Sound Design` folder must still fit the definitions of the `Art & Design` folder. That hierarchical structure is applied to every subfolder in the library, allowing for information browsing based on subject.

There still is some areas I'm needing to refine - movie reviews are the most confusing for me to sort for some reason - but I'm still more comfortable about my library of endless links now than I was when they were more all over the place. I feel this exercise has encouraged me to continue bookmarking with the confidence that I will be able to recall the link later on. Like I said previously, bookmarking is a way to build your own library of things that matter to you. In a world of growing specialized knowledge, I believe that's a powerful tool to have.