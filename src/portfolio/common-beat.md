---
title: "Common Beat"
description: "An interactive art piece where players drum to their own rhythms."
date: 2023-04-10
img: "assets/portfolio/common-beat.png"
links:
  - github: "https://github.com/PersonMeetup/CommonBeat"
---

_Common Beat_ was an interactive art piece created for the [University of Lethbridge's](https://www.ulethbridge.ca/) Interaction Design course in the Spring 2023 semester. In it, two players drum to their own rhythms, represented as vibrant pulses. As the players continue drumming, a central tempo begins to emanate from between the two pulses. Barely existing at first, the tempo grows to overpower the inputs of the players until they choose not to play along anymore. _Common Beat_ serves as a personal reflection on how mediation is a form of control over others, while still acknowledging its power to unite us together.

The concept behind _Common Beat_ came from the theme of the assignment, which was “Collective Memory with a Subjective Twist.” From that mouthful, the first idea that came to mind was rhythm. We all work on our own tempos, and sometimes they don't align with others. My idea was then to have the player pulses generate a centre pulse that would be an average of the two inputs over some period of time. While the idea was good, I was later told that _I_ had to posit the subjective twist in my work.

After spending some time thinking about it, I realized that my attempted dodge of addressing the subjective twist still addressed it. I realized that the medium of rhythm could be a way to express my feeling on mediation, a topic that I had been thinking about throughout the semester due to some personal revelations.

Without going too deep into details, mediation has been a significant part of my life and how I approach my interactions with others. It's what allows me to talk to people with varying differences in perspectives. That said, it's also a way I attempt to control situations that I can't do anything about. Bringing music into the equation, I'd argue a conductor serves the same role as a mediator. They allow performers to come together and perform even better, but that's assuming they're not acting like Terrence Fletcher.

![Two handmade drum pads with felt surfaces, connected to a breadboard by alligator clips.](assets/portfolio/common-beat-circuit.jpg "The physical circuit I made for class")

With those realizations in mind, I had a solid scope for the project. Instead of averaging player inputs as they made them, I'd just pulse a constant tempo as players continued sending inputs. From there, this project began relatively simple. I already had some code that did almost what I needed from another project, so I copied it over and adjusted the classes to better fit in with the assignment.

The physical side was even easier, as the Arduino circuit I needed boiled down to taking the states of two buttons. The problems I did have coding for the Arduino involved making it easier for Processing to clean up data sent onto the serial bus, but that was solved by including a tab character between pin readings. Assuming the last variable was sent out with `println()`, Processing's `splitTokens()` function would be able to break up the data into an easilly usable array! All I had to do was check if one index was true or false before triggering a pulse.

While this definately was a minor project in terms of workload for me, it was one that I still really appreciated. It gave me an opprotunity to revisit Processing, let me reflect and remind myself of my relationship with mediation, and allowed me to focus on other courses that needed my attention. _Common Beat_ might not be much, but it was still a fun project that came around at the perfect time.
