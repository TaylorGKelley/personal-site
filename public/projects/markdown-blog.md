---
title: Markdown-based Blog
preview_url: https://taylorkelley.dev/blog
github_url: https://github.com/TaylorGKelley/personal-site
---

Being a web developer, I knew I should definately code my own blog, though deciding how to manage the posts led me to two options. On one hand I could either use or code a custom Content management system (CMS), where users could leave comments and posts could be managed via a database for faster lookup times. Yet on the otherhand, being a personal blog I really didn't need comments or post interactions, and statically rendered pages would make for much better performance. While this would be great managing the blog via markdown files, it also meant that I would have to republish the site whenever a new post was made, or store them elsewhere like in a cloud storage server. That's when I thought of the solution, sync posts to a github repository and make API calls to that repo whenever the pages were re-rendered! This gave me an easy CMS like system where I could manage posts, create branches for posts that I didn't want published yet, and easily have a api to call when statically rendering pages.
