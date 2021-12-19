---
layout: post
title: "How to save ANSI codes from dialog command to a file"
description: How to get the dialog command into a file with all ANSI escape codes so that it can be printed later
subject: How to save ANSI codes from dialog command to a file
apple-title: How to save ANSI codes from dialog command to a file
app-name: How to save ANSI codes from dialog command to a file
tweet-title: How to save ANSI codes from dialog command to a file
tweet-description: How to get the dialog command into a file with all ANSI escape codes so that it can be printed later
og-title: How to save ANSI codes from dialog command to a file
og-url: blog/2021/12/17/how-to-save-ansi-codes-from-dialog-command-to-a-file
canonical-url: blog/2021/12/17/how-to-save-ansi-codes-from-dialog-command-to-a-file
date: 2021-12-17
keywords: Abhishek Kumar, Software Developer, Linux, command, ANSI, print, bash, dialog, script
---

So, if you want to save ANSI code from a dialog command to a file, such as say this is the dialog command:

```
dialog --title "HELLO" --yesno "Are you sure?" 6 30
```
And you want to save it into a file with all the ANSI escape codes for printing purposes, then you could use `script`.

```
script -q -c 'dialog --title "HELLO" --yesno "Are you sure?" 6 30'
```

The `dialog` command runs interactively, so one could exit it easily. One could even track screen changes made in response to the user's input as `script` also supports timestamps which would be useful. The output of the command is stored in a file called `timestamp`. This can be changed by specifying the filename in the command line. The file could contain start and end lines as such:

```
Script started on ...
Script done on ...
```

If one would remove those that are not necessary, they will be left with `dialog`s output with escape codes.

