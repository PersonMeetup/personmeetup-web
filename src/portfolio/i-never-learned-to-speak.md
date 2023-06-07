---
title: "I Never Learned To Speak"
description: "I can't articulate just how much Word salad is a thing numbs my brain."
date: 2023-05-15
img: "assets/portfolio/i-never-learned-to-speak.png"
type: "Web Design"
links:
  - other: "https://personmeetup.github.io/NMED4520-FontAnimation/"
---

{% info %} This overview focuses on the technical aspects of *I never learned to speak*, as I feel I've already said much of what I need to about its artistic intent within the page itself. {% endinfo %}

*I never learned to speak* was my final project for my Advanced Web Design class at the University of Lethbridge. Structured to make things easier for us at the end of the semester, the main goal of the assignment was to play around with (variable) fonts and CSS animations. It was a simple outline that was open to interpretation from us students, giving us a lot of leeway in what direction we took our projects. For me personally, I decided very early on that I wanted to take the design parameters very literally.

The first animation I began making for the page was that in “The Fall” section. The falling font in the final page is the result of multiple classes that modify a base `animation` property. This allowed me to vary how different words fell by using premade settings, rather than create multiple classes that would ultimately be variations of the same animation. The most difficult part in coding this section would've been figuring out how the styles would overwrite each other, as that was something that caught me off guard for a while. Ultimately, this section is most notable to me for setting the tone of the whole project, since the structure came to justify this animation.

The next notable section is “The Landing”, where I would redeem myself from the previous project and manage to properly implement `offset-path`. Previously, I felt like I was unable to control the position of the path to line up alongside another graphical element. It didn't help that my attempts to rescale the element proved futile in making any change to the path. Having spent some time experimenting with how `offset-path` works, I ended up realizing that I needed to apply the scaling to the property's path value rather than the container element itself. Once that was sorted, things fell smoothly into place for that section.

For the progressive animations, I again utilized Russell Samora & Jonathan Soma's fantastically simple [enter-view](https://github.com/russellsamora/enter-view) library. I did my best to minimize my use of the library as much as possible, opting to use CSS where I could. As powerful as JavaScript is with libraries, I value sending as few scripts as possible to keep data transfers to a minimum. It also helps that more people could access the webpage as a result.

Overall, *I never learned to speak* was a great end to the semester for me. It was a project that challenged me both technically and creatively, and I'm proud of what I managed to accomplish in what was a relatively short time frame. ~~Even if it meant pulling an all-nighter to get it done.~~