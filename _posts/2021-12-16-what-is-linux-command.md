---
layout: post
title: "What is linux 'command'?"
description: Stumbled onto Linux "command"? This has all the explanations you need. 
subject: What is linux 'command'?
apple-title: What is linux 'command'?
app-name: What is linux 'command'?
tweet-title: What is linux 'command'?
tweet-description: Stumbled onto Linux "command"? This has all the explanations you need.
og-title: Stumbled onto Linux "command"? This has all the explanations you need.
og-url: blog/2021/12/16/what-is-linux-command
canonical-url: blog/2021/12/16/what-is-linux-command
date: 2021-12-15
keywords: Abhishek Kumar, Software Developer, Linux, command, man, help, bash, studying, scripts
---

So if you were reading some internal bash scripts of Linux, you may have come across a command called "command" doing something like this:
```
if command -v script.sh; then 
	do stuff; 
fi
```

Yes, the command is just called a "command". So what is this "command"? 

Usually, one would search with man pages like so:

```
# man command
```
But if you would do this, you would get an output as such:

```
-bash: man: command not found
```
If you would try something like:

```
# command -?
```

You would get an output as such:

```
# command -?
-bash: command: -? invalid option
command: usage: command [-pVv] command [arg ...]
```

This does give a hint that there is some usage with `-v` as we have seen before. But nothing to be exact.

And if you would search its version, like so:

```
# command -v
```
It will output nothing at all.

So what is this "command"?

```
$ type command
command is a shell builtin
```


So the answer is, that "command" is not an external command. But it is a built-in feature of the shell, which is usually bash. One could use,

```
# help command
```
To see its details. 

```
$ help command
command: command [-pVv] command [arg ...]
    Execute a simple command or display information about commands.

    Runs COMMAND with ARGS suppressing  shell function lookup, or display
    information about the specified COMMANDs.  Can be used to invoke commands
    on disk when a function with the same name exists.

    Options:
      -p    use a default value for PATH that is guaranteed to find all of
        the standard utilities
      -v    print a description of COMMAND similar to the `type' builtin
      -V    print a more verbose description of each COMMAND

    Exit Status:
    Returns exit status of COMMAND, or failure if COMMAND is not found.
```


Or if you do:

```
# man bash
```

You would find an entry as such:

```
command [-pVv] command [arg ...]
            Run  command  with args suppressing the normal shell function lookup.  Only builtin commands or commands found
            in the PATH are executed.  If the -p option is given, the search for command  is  performed  using  a  default
            value  for  PATH  that  is guaranteed to find all of the standard utilities.  If either the -V or -v option is
            supplied, a description of command is printed.  The -v option causes a single word indicating the  command  or
            filename used to invoke command to be displayed; the -V option produces a more verbose description.  If the -V
            or -v option is supplied, the exit status is 0 if command was found, and 1 if not.  If neither option is  sup‐
            plied and an error occurred or command cannot be found, the exit status is 127.  Otherwise, the exit status of
            the command builtin is the exit status of command.

```
in "SHELL BUILTIN COMMANDS" section.
