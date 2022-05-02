---
layout: post
title: "How to convert frontend web app to android app using Cordova"
description: In this tutorial I will show you on how to convert any web app made from HTML, CSS and javascript to offline android app using Cordova
subject: Convert frontend web app to android app using Cordova
apple-title: Convert frontend web app to android app using Cordova
app-name: Convert frontend web app to android app using Cordova
tweet-title: How to convert frontend web app to android app using Cordova
tweet-description: In this tutorial I will show you on how to convert any web app made from HTML, CSS and javascript to offline android app using Cordova
og-title: How to convert frontend web app to android app using Cordova
og-url: blog/2022/05/01/how-to-convert-frontend-web-app-to -android-app-using-cordova
canonical-url: blog/2022/05/01/how-to-convert-frontend-web-app-to -android-app-using-cordova
date: 2022-05-01
keywords: Abhishek Kumar, Software Developer, android, development, android development, gradle, npm, nvm, javascript, java, guide, tutorial, HTML, CSS

---
Hi, in this tutorial I will convert a frontend web app made from HTML, CSS, and Javascript to an android app that could be published to the google play store via Cordova. 


If you don't know how to set up Cordova, [refer to my previous article.](../../../2022/04/30/how-to-setup-cordova-in-xubuntu-or-ubuntu-for-android-development-full-guide)

To convert a front-end web app to an android app, we first need a front-end web app of course. I will be converting [2048 cubix](https://2048-cubix.netlify.app/) web app. Its source code could be found [here](https://github.com/Mr-Kumar-Abhishek/2048-cubix).

Okay, so the first thing you need to do is to navigate to your projects folder:

```
$ cd projects
```

Then use this Cordova command to create the app: 

```
cordova create 2048-cubix-app app.netlify.cubix.twa 2048-cubix

```

Here the 2nd argument of the command `2048-cubix-app` is the folder name in which the Cordova Project is created.  The next argument `app.netlify.cubix.twa` is the package name of the app. And lastly `2048-cubix` is the app name.  

The output of the above command should look something like this:

```
Creating a new cordova project.
```

After the project is created, we will change our directory to the Cordova project one:

```
cd 2048-cubix-app
```

And if we list files there we would see the following files:

```
foobar@foobar:~/projects/2048-cubix-app$ ls
config.xml  package.json  www
```

Okay, so we have our sample project started. Now we have to record these in git so that we could track all the changes in it.
To do this, we would initialize a git repository in this folder

```
foobar@foobar:~/projects/2048-cubix-app$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint: 
hint: 	git config --global init.defaultBranch <name>
hint: 
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint: 
hint: 	git branch -m <name>
Initialized empty Git repository in /home/foobar/projects/2048-cubix-app/.git/
```

Once the git repositories are initialized we will go ahead and add our name and email address to the git repository:

So, the email goes as such:
```
foobar@foobar:~/projects/2048-cubix-app$ git config user.email add mr.kumar.abhishek@email.com
```

And your name goes as such:

```
foobar@foobar:~/projects/2048-cubix-app$ git config user.name 'Abhishek Kumar'
```

As these are done we need to add all the files for tracking to make the first commit:

```
$ git add -A
```

Then we will go ahead and do our first commit to the project:

```
foobar@foobar:~/projects/2048-cubix-app$ git commit -m 'initial commit'
[master (root-commit) f460ba1] initial commit
 7 files changed, 241 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 config.xml
 create mode 100644 package.json
 create mode 100644 www/css/index.css
 create mode 100644 www/img/logo.png
 create mode 100644 www/index.html
 create mode 100644 www/js/index.js
```

Next, we have to make a git repository in the git hosting service and push the commit there. I will be using [Github](https://github.com) for this.

So after you have made an account on Github, go to your dashboard and click on the "new" button:

