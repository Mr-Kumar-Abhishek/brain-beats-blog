---
layout: post
title: "How to choose between relative and absolute pathnames while creating symlinks"
description: Confused about whether to use relative or absolute pathnames while creating symlinks? This guide will help in making your decision.
subject: How to choose between relative and absolute pathnames while creating symlinks
apple-title: How to choose between relative and absolute pathnames while creating symlinks
app-name: How to choose between relative and absolute pathnames while creating symlinks
tweet-title: How to choose between relative and absolute pathnames while creating symlinks
tweet-description: Confused about whether to use relative or absolute pathnames while creating symlinks? This guide will help in making your decision.
og-title: How to choose between relative and absolute pathnames while creating symlinks
og-url: blog/2021/12/18/how-to-choose-between-relative-and-absolute-pathnames-while-creating-symlinks
canonical-url: blog/2021/12/18/how-to-choose-between-relative-and-absolute-pathnames-while-creating-symlinks
date: 2021-12-18
keywords: Abhishek Kumar, Software Developer, Linux, symlinks, absolute, relative, pathname.
---

You may have read in some books that while making symbolic links it is better to use a relative pathway because if we move the file and link, it will not break. So, for example, if we want to link `/etc/passwd` to the current directory, we would do something like this:

```
ln -rs /etc/passwd passwd-symlink
```
This will create a relative pathway link. But is this necessary?

There are no clear answers for this. There are many instances of whether you can create a symlink target that is relative or absolute and it makes no difference. 

It is usually better to create a relative symlink if any of these below points apply because the link will be valid in those situations:

* when the target is in the same directory tree and the whole directory tree can be moved.
* when the target is in the same filesystem and it could get mounted in some other mount location such as in a rescue live environment, a container, or another system.

However, if the following conditions which are given below apply, it is better to use an absolute pathway in the symlink.

* when the target is radically in a different directory and the right number of `../` sequences are not clear.
* when the user wants to point to a specific file that is not relative to the current directory
* when the user wants to be very clear where the specific file points to, while on the other hand using a relative link will turn into a maze of symlinks pointing to symlinks or that the target traverses symlinks to directories and so on.


