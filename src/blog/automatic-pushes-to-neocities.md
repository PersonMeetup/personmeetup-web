---
title: "Automatic Pushes to Neocities"
description: A look at how you can use GitHub to update your Neocities site.
date:
tags:
  - Web-Design
layout: layouts/post.njk
---

I've written previously about [how you can use static site generators to streamline web development](/blog/streamlining-web-development), but there's one thing that's missing from that article: how do you push your site to the web? Considering how the example site in the last article was created, someone could just drag and drop the compiled files in the `_site` folder to wherever they're hosting their website. This is especially true if you're using [Neocities](https://neocities.org/), which even includes an online HTML editor for users to code in.

With that said, we're using a static-site generator; we should be able to automate uploading our site to Neocities. Neocities even provide an [API](https://neocities.org/api) for users to update their sites with. We could just utilize that, right?

While we could do that, we shouldn't try to reinvent the wheel. People have already created solid tools that automate pushing sites to Neocities, so it may be easier to try using those tools than to create our own. The one I personally use is Bret Comnes' [deploy-to-neocities](https://github.com/bcomnes/deploy-to-neocities) action on GitHub, and I'll be explaining how you can set your own site up to utilize it as well.

## Don't Forget Your Life-Jacket

As you could probably guess from me mentioning API's and GitHub, this article will be swimming in the deep end of web development. If you still want to follow along but worried about drowning in the technical mumbo-jumbo, here's some things to help keep you afloat.

### Git and GitHub

quick overview on git

quick overview on github

### Code Editors

While Notepad may be the gold standard, working in a proper code editor can make your life easier. I recommend [Visual Studio Code](https://code.visualstudio.com/), as it's a flexible, lightweight editor with built-in Git support. If you refuse to touch anything Microsoft, consider installing [VSCodium](https://vscodium.com/) instead.

##
