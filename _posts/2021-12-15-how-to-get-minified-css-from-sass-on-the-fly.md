---
layout: post
title: "How to get minified CSS from SASS on the fly"
description: How to minify CSS from SASS on the fly as you develop a website or an web app.
subject: How to get minified CSS from SASS on the fly
apple-title: How to get minified CSS from SASS on the fly
app-name: How to get minified CSS from SASS on the fly
tweet-title: How to get minified CSS from SASS on the fly
tweet-description: How to minify CSS from SASS on the fly as you develop a website or an web app.
og-title: How to get minified CSS from SASS on the fly
og-url: blog/2021/12/15/how-to-get-minified-css-from-sass-on-the-fly
canonical-url: blog/2021/12/15/how-to-get-minified-css-from-sass-on-the-fly
date: 2021-12-15
keywords: Abhishek Kumar, Software Developer, SASS, CSS, minify, web, web development, web designing, npm, node.js, Linux
---




**Quick Answer:**

```
sass --watch input.scss:output.css --style compressed
```
**Long Answer:**

SASS is a great extension language for CSS. It brings in a lot of features which is not available in CSS. For those of you who don't know, SASS stands for "syntactically awesome stylesheet". It is a CSS preprocessor. 

Installation of SASS can be easily done via NPM with this command:

```
$ npm install -g sass
```

To compile SASS to CSS you would just use this command:

```
$ sass input.scss output.css
```

But when you are developing a website, you would want to the output as soon as you change it so that is where `--watch` comes in.

If you use the command:

```
$ sass --watch input.scss:output.css
```

The command will run continuously on the terminal and will watch for any changes that are done on the `input.scss` file. If it detects any changes then it will immediately compile them in the `output.css` file.

However, if you know a bit SEO, then you know a for a website to work fast, it has to have minified CSS and JS files. So how can you have minified CSS file as soon as you change something in your SCSS file?

It's simple, use this command:

```
sass --watch input.scss:output.css --style compressed
```


