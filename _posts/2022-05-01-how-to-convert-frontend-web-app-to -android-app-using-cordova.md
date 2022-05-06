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
hint:   git config --global init.defaultBranch <name>
hint: 
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint: 
hint:   git branch -m <name>
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


[![New Button](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651797299/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-48-54.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651797299/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-48-54.png)

<br>

After clicking on the new button, you will get a form to fill in the details of the repository as such:

[![Repository Form Fill Up](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651797552/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-49-32.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651797552/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-49-32.png)

In it, fill the repository name and the description of the repository.

[![Name of the repository and description](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651798302/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-50-55.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651798302/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-50-55.png)

Then in the initialize section keep everything blank and default as we do not have to initialize the repository. We already have the repository that we have to push here.

[![Nothing to initialize the repository](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651798875/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-51-27.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651798875/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-51-27.png)

After you have created the create repository button, you see something like this:

[![New Repository](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651799197/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-53-06.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651799197/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-03_02-53-06.png)

Next, scroll down and follow the first command the instructions under "push an existing repository".  We have to go to our Cordova Project directory and put in this command to add the default remote for the repository:

```
git remote add origin git@github.com:Mr-Kumar-Abhishek/2048-cubix-app.git
```

Afterward, when we will check the existing repositories in our app with this command:

```
$ git remote -v
```
We would get some output like this:

```
origin	git@github.com:Mr-Kumar-Abhishek/2048-cubix-app.git (fetch)
origin	git@github.com:Mr-Kumar-Abhishek/2048-cubix-app.git (push)
```

This way we could confirm that remote named origin was added.

Next, we have to push the master branch to Github. To do this, we need to use this command:

```
$ git push origin master
```

The output of the above code would look something like this:

```
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 4 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (13/13), 25.49 KiB | 2.83 MiB/s, done.
Total 13 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), done.
To github.com:Mr-Kumar-Abhishek/2048-cubix-app.git
 * [new branch]      master -> master
```

We have the sample repository ready. Now, we have to get the web app files in the `www` directory. To do this, we can initialize another git repository.

So let's switch to `www` directory:

```
$ cd www
```

If we list files, we would see something like this:

```
foobar@foobar:~/projects/2048-cubix-app/www$ ls
css  img  index.html  js
```

Now we do not need any files here. So we will go ahead and delete all the files in this folder with this command:

```
$ rm -rf *
```

Next, we would initialize a new git repository in the same folder.

```
foobar@foobar:~/projects/2048-cubix-app/www$ rm -rf * 
foobar@foobar:~/projects/2048-cubix-app/www$ ls
foobar@foobar:~/projects/2048-cubix-app/www$ git init
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
Initialized empty Git repository in /home/foobar/projects/2048-cubix-app/www/.git/
```
 
Then, we will add the web app's git repository's remote:

```
 git remote add origin git@github.com:Mr-Kumar-Abhishek/2048-cubix.git
```
After adding it, we will pull its branches:

```
foobar@foobar:~/projects/2048-cubix-app/www$ git pull
remote: Enumerating objects: 525, done.
remote: Counting objects: 100% (169/169), done.
remote: Compressing objects: 100% (129/129), done.
remote: Total 525 (delta 54), reused 140 (delta 29), pack-reused 356
Receiving objects: 100% (525/525), 586.95 KiB | 570.00 KiB/s, done.
Resolving deltas: 100% (250/250), done.
From github.com:Mr-Kumar-Abhishek/2048-cubix
 * [new branch]      dev        -> origin/dev
 * [new branch]      gh-pages   -> origin/gh-pages
 * [new branch]      master     -> origin/master
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master

```

Then we will checkout to master branch:

```
foobar@foobar:~/projects/2048-cubix-app/www$ git checkout master
Branch 'master' set up to track remote branch 'master' from 'origin'.
Already on 'master'
```

After doing this, we will go back to the main project folder:

```
$ cd ..
```

And then check all the changes with:

```
$ git status
```

The output should look like this:

```
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    www/css/index.css
	modified:   www/img/logo.png
	modified:   www/index.html
	deleted:    www/js/index.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	www/.well-known/
	www/BingSiteAuth.xml
	www/LICENSE
	www/README.md
	www/favicon.ico
	www/google7484c80835cfba45.html
	www/img/logo-114.png
	www/img/logo-128.png
	www/img/logo-144.png
	www/img/logo-152.png
	www/img/logo-192.png
	www/img/logo-256.png
	www/img/logo-512.png
	www/img/maskable_icon.png
	www/js/animframe_polyfill.js
	www/js/application.js
	www/js/game_manager.js
	www/js/grid.js
	www/js/html_actuator.js
	www/js/keyboard_input_manager.js
	www/js/local_score_manager.js
	www/js/serviceLoader.js
	www/js/tile.js
	www/js/workbox/
	www/manifest.json
	www/privacy-policy.html
	www/robots.txt
	www/sitemap.xml
	www/style/
	www/sw.js

no changes added to commit (use "git add" and/or "git commit -a")

```

We will then go ahead and add all these changes:

```
$ git add -A
```	

Then, checking the status of our git repository, it would look something like this:

```
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   www/.well-known/assetlinks.json
	new file:   www/BingSiteAuth.xml
	new file:   www/LICENSE
	new file:   www/README.md
	deleted:    www/css/index.css
	new file:   www/favicon.ico
	new file:   www/google7484c80835cfba45.html
	new file:   www/img/logo-114.png
	new file:   www/img/logo-128.png
	new file:   www/img/logo-144.png
	new file:   www/img/logo-152.png
	new file:   www/img/logo-192.png
	new file:   www/img/logo-256.png
	new file:   www/img/logo-512.png
	modified:   www/img/logo.png
	new file:   www/img/maskable_icon.png
	modified:   www/index.html
	new file:   www/js/animframe_polyfill.js
	new file:   www/js/application.js
	new file:   www/js/game_manager.js
	new file:   www/js/grid.js
	new file:   www/js/html_actuator.js
	deleted:    www/js/index.js
	new file:   www/js/keyboard_input_manager.js
	new file:   www/js/local_score_manager.js
	new file:   www/js/serviceLoader.js
	new file:   www/js/tile.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-background-sync.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-background-sync.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-background-sync.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-background-sync.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-core.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-core.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-core.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-core.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-expiration.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-expiration.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-expiration.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-expiration.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-offline-ga.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-offline-ga.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-offline-ga.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-offline-ga.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-precaching.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-precaching.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-precaching.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-precaching.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-range-requests.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-range-requests.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-range-requests.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-range-requests.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-recipes.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-recipes.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-recipes.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-recipes.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-routing.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-routing.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-routing.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-routing.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-strategies.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-strategies.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-strategies.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-strategies.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-streams.dev.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-streams.dev.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-streams.prod.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-streams.prod.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-sw.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-sw.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.es5.mjs
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.es5.mjs.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.mjs
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.mjs.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.umd.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.dev.umd.js.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.es5.mjs
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.es5.mjs.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.mjs
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.mjs.map
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.umd.js
	new file:   www/js/workbox/workbox-v6.5.3/workbox-window.prod.umd.js.map
	new file:   www/manifest.json
	new file:   www/privacy-policy.html
	new file:   www/robots.txt
	new file:   www/sitemap.xml
	new file:   www/style/main.css
	new file:   www/sw.js

```

Now, we would commit all the changes:

```
$ git commit -m 'Include 2048-cubix web app files'
```

The output should look something like this:

```
foobar@foobar:~/projects/2048-cubix-app$ git commit -m 'Include 2048-cubix web app files'
[master aa5a7aa] Inlcude 2048-cubix web app files
 99 files changed, 15020 insertions(+), 189 deletions(-)
 create mode 100644 www/.well-known/assetlinks.json
 create mode 100644 www/BingSiteAuth.xml
 create mode 100644 www/LICENSE
 create mode 100644 www/README.md
 delete mode 100644 www/css/index.css
 create mode 100644 www/favicon.ico
 create mode 100644 www/google7484c80835cfba45.html
 create mode 100644 www/img/logo-114.png
 create mode 100644 www/img/logo-128.png
 create mode 100644 www/img/logo-144.png
 create mode 100644 www/img/logo-152.png
 create mode 100644 www/img/logo-192.png
 create mode 100644 www/img/logo-256.png
 create mode 100644 www/img/logo-512.png
 rewrite www/img/logo.png (99%)
 create mode 100644 www/img/maskable_icon.png
 rewrite www/index.html (97%)
 create mode 100644 www/js/animframe_polyfill.js
 create mode 100644 www/js/application.js
 create mode 100644 www/js/game_manager.js
 create mode 100644 www/js/grid.js
 create mode 100644 www/js/html_actuator.js
 delete mode 100644 www/js/index.js
 create mode 100644 www/js/keyboard_input_manager.js
 create mode 100644 www/js/local_score_manager.js
 create mode 100644 www/js/serviceLoader.js
 create mode 100644 www/js/tile.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-background-sync.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-background-sync.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-background-sync.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-background-sync.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-broadcast-update.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-cacheable-response.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-core.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-core.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-core.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-core.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-expiration.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-expiration.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-expiration.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-expiration.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-navigation-preload.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-offline-ga.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-offline-ga.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-offline-ga.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-offline-ga.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-precaching.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-precaching.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-precaching.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-precaching.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-range-requests.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-range-requests.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-range-requests.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-range-requests.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-recipes.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-recipes.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-recipes.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-recipes.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-routing.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-routing.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-routing.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-routing.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-strategies.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-strategies.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-strategies.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-strategies.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-streams.dev.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-streams.dev.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-streams.prod.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-streams.prod.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-sw.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-sw.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.es5.mjs
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.es5.mjs.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.mjs
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.mjs.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.umd.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.dev.umd.js.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.es5.mjs
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.es5.mjs.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.mjs
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.mjs.map
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.umd.js
 create mode 100644 www/js/workbox/workbox-v6.5.3/workbox-window.prod.umd.js.map
 create mode 100644 www/manifest.json
 create mode 100644 www/privacy-policy.html
 create mode 100644 www/robots.txt
 create mode 100644 www/sitemap.xml
 create mode 100644 www/style/main.css
 create mode 100644 www/sw.js

```

And then we would push the changes to Github:

```
foobar@foobar:~/projects/2048-cubix-app$ git push origin master
Enumerating objects: 112, done.
Counting objects: 100% (112/112), done.
Delta compression using up to 4 threads
Compressing objects: 100% (103/103), done.
Writing objects: 100% (106/106), 534.74 KiB | 1.12 MiB/s, done.
Total 106 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (5/5), completed with 1 local object.
To github.com:Mr-Kumar-Abhishek/2048-cubix-app.git
   f460ba1..679017c  master -> master

```

Next, we have to edit the package.json file from this:

````
{
  "name": "app.netlify.cubix.twa",
  "displayName": "2048-cubix",
  "version": "1.0.0",
  "description": "A sample Apache Cordova application that responds to the deviceready event.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "ecosystem:cordova"
  ],
  "author": "Apache Cordova Team",
  "license": "Apache-2.0"
}

````

To something like this:

```
{
  "name": "app.netlify.cubix.twa",
  "displayName": "2048-cubix",
  "version": "1.0.1",
  "description": "A simple 3D puzzle game in which you have to move the boxes to make 2048.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "ecosystem:cordova"
  ],
  "author": "Abhishek Kumar",
  "license": "MIT"
}

```

Then commit these changes by:

```
$ git commit -am 'update package.json file'
```

And then push the changes to Github:


```
$ git push origin master
```

Next, we will edit the config.xml file from:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="app.netlify.cubix.twa" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>2048-cubix</name>
    <description>Sample Apache Cordova App</description>
    <author email="dev@cordova.apache.org" href="https://cordova.apache.org">
        Apache Cordova Team
    </author>
    <content src="index.html" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
</widget>

```

To this:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="app.netlify.cubix.twa" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>2048-cubix</name>
    <description>A 3D puzzle game to get the number 2048</description>
    <author email="mr.kumar.abhishek@email.com" href="https://mr-kumar-abhishek.github.io">
        Abhishek Kumar
    </author>
    <content src="index.html" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
</widget>

```

Then again we will commit and push the changes:

```
foobar@foobar:~/projects/2048-cubix-app$ git commit -am 'update config.xml'
[master 3f02903] update config.xml
 1 file changed, 3 insertions(+), 3 deletions(-)
foobar@foobar:~/projects/2048-cubix-app$ git push origin master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 398 bytes | 199.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:Mr-Kumar-Abhishek/2048-cubix-app.git
   558a5f7..3f02903  master -> master
```

After we have done all the initial project setup, we have to now add the platform android to the project:

```
foobar@foobar:~/projects/2048-cubix-app$ cordova platform add android@8.0.0
Using cordova-fetch for cordova-android@8.0.0
Adding android project...
Creating Cordova project for the Android platform:
        Path: platforms/android
        Package: app.netlify.cubix.twa
        Name: 2048_cubix
        Activity: MainActivity
        Android target: android-28
Subproject Path: CordovaLib
Subproject Path: app
Android project created with cordova-android@8.0.0
CordovaError: Error validating project name. Project name must not begin with a number
    at Object.validateProjectName (/home/foobar/projects/2048-cubix-app/node_modules/cordova-android/bin/lib/create.js:230:25)
    at /home/foobar/projects/2048-cubix-app/node_modules/cordova-android/bin/lib/create.js:275:21
    at _fulfilled (/home/foobar/projects/2048-cubix-app/node_modules/q/q.js:854:54)
    at /home/foobar/projects/2048-cubix-app/node_modules/q/q.js:883:30
    at Promise.promise.promiseDispatch (/home/foobar/projects/2048-cubix-app/node_modules/q/q.js:816:13)
    at /home/foobar/projects/2048-cubix-app/node_modules/q/q.js:877:14
    at runSingle (/home/foobar/projects/2048-cubix-app/node_modules/q/q.js:137:13)
    at flush (/home/foobar/projects/2048-cubix-app/node_modules/q/q.js:125:13)
    at processTicksAndRejections (node:internal/process/task_queues:78:11)
```

As you could see there is an error here that we can't have a project name starting with a number. To rectify this, we would edit the config.xml file's name tag to:

```
<name>A-2048-cubix</name>
```

Then, remove the android platform that we had added before:

```
$ cordova platform remove android
```

And re-adding it:

```
foobar@foobar:~/projects/2048-cubix-app$ cordova platform add android@8.0.0
Using cordova-fetch for cordova-android@8.0.0
Adding android project...
Creating Cordova project for the Android platform:
        Path: platforms/android
        Package: app.netlify.cubix.twa
        Name: A_2048_cubix
        Activity: MainActivity
        Android target: android-28
Subproject Path: CordovaLib
Subproject Path: app
Android project created with cordova-android@8.0.0
```
Now when you check the status of the git repository, you will find something like this:

```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config.xml
        modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")
```
So let's add these changes to git, commit them and push it to Github:

```
foobar@foobar:~/projects/2048-cubix-app$ git add -A
foobar@foobar:~/projects/2048-cubix-app$ git commit -m 'change project name'
[master daeb395] change project name
 3 files changed, 905 insertions(+), 3 deletions(-)
 create mode 100644 package-lock.json
foobar@foobar:~/projects/2048-cubix-app$ git push origin master
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 5.40 KiB | 789.00 KiB/s, done.
Total 5 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:Mr-Kumar-Abhishek/2048-cubix-app.git
   3f02903..daeb395  master -> master
```

Now, Let's emulate the project and see how it looks:

```
$ cordova emulate
```

[![Emulation](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651806475/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-06_08-32-04.png)](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1651806475/mr-kumar-abhishek.github.io/img/Screenshot_2022-05-06_08-32-04.png)

