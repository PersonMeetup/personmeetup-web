---
title: Getting ISO Time with Python Datetime
description: Garnished with a side of Dateutil and Pyperclip
tags:
  - Programming
  - Python
layout: layouts/post.njk
---

A bit of context before we jump into the code: As I'm finishing a blog post, I include the current date and time in the markdown file's YAML data. The one special thing about that is how it's in ISO 8601 format, which is done so that I can alter the data when it gets processed through [Eleventy](https://www.11ty.dev/), the static site generator I use to make this site. When I [first started properly timestamping](https://github.com/PersonMeetup/personmeetup-web/issues/8), I created a small little Python script that got the current time and copied it into my computer's clipboard in the format I needed. Now that I'm doing my writing within [Obsidian](https://obsidian.md/), that little script I made has been made redundant with templates and their date time formatting options. There's still quite a bit going on in this tiny script, though, so I figured I'd give it a moment to shine before I retired it.

## The Script

This script requires the following pip packages: [`python-dateutil`](https://pypi.org/project/python-dateutil/), [`pyperclip`](https://pypi.org/project/pyperclip/)

```python
from datetime import datetime
from dateutil import tz
import pyperclip

current = datetime.now(tz.gettz('America/Edmonton'))
pyperclip.copy(current.isoformat())
```

## The Breakdown

At it's core, this script is based around Python's [`datetime` Module](https://docs.python.org/3/library/datetime.html); specifically the `datetime` submodule. From that submodule, only two functions will be used: `.now()` to get the current time according to the system clock and `.isoformat()` to convert the `datetime.datetime` object into a string that's in ISO 8601 format.

```python
from datetime import datetime

current = datetime.now()
print(current.isoformat())
```

Functionally the script is complete, but there are still some quality of life things can could be included, such as timezones and clipboard copying. That's where our previously mentioned pip packages come into play.

`python-dateutil` extends the functionality of the built-in `datetime` module significantly, but we're going to use for its `.tz` submodule. This submodule includes a handful of timezone related tools, all of which operate around the `datetime.tzinfo` object type. This type can be passed to `datetime.now()` for it to include timezone information alongside the current time. We'll use the `.tz` submodule's `.gettz()` function to handle any timezone data for us.

::: info
While the code so far has shown `.gettz()` being given a string that corresponds to a designated IANA [tz database key](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), it's worth noting that the function doesn't need an input in order to work. Left at its default values, `.gettz()` will use the timezone information of the local time instead.
:::

```python
from datetime import datetime
from dateutil import tz

current = datetime.now(tz.gettz('America/Edmonton'))
print(current.isoformat())
```

Finally, we include `pyperclip` to add copy/paste functionallity to the script, allowing for the formatted time to be copied into our computer's clipboard.

```python
from datetime import datetime
from dateutil import tz
import pyperclip

current = datetime.now(tz.gettz('America/Edmonton'))
pyperclip.copy(current.isoformat())
```

And there you have it! It's nothing too big, but I found it was definately handy for how I was writing my posts initially. Now that I'm using a program that has similar functionality built in, however, this little script of mine could be considered redundant. Heck, with Eleventy's [recent inclusion](https://www.11ty.dev/docs/dates/#setting-a-content-date-in-front-matter) of `git Created` as an input for `date` values, even bothering with a ISO 8601 string in the first place might be a bit redundant. 😅
