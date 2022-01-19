---
layout: post
title: "Hello World program in Visual Basic in Linux with .NET Core"
description: In this tutorial I will tell how to make your first VB program in Linux with .Net Core.
subject: Hello World program in Visual Basic in Linux with .NET Core
apple-title: Hello World program in Visual Basic in Linux with .NET Core
app-name: Hello World program in Visual Basic in Linux with .NET Core
tweet-title: Hello World program in Visual Basic in Linux with .NET Core
tweet-description: In this tutorial I will tell how to make your first VB program in Linux with .NET Core.
og-title: Hello World program in Visual Basic in Linux with .NET Core
og-url: blog/2022/01/18/hello-world-program-in-visual-basic-in-linux with-dot-net-core
canonical-url: blog/2022/01/18/hello-world-program-in-visual-basic-in-linux with-dot-net-core
date: 2022-01-18
keywords: Abhishek Kumar, Software Developer, .NET, Linux, .NET core, Visual Basic, VB
---

So, first of all, you have to install .NET core in your Linux OS. To install it [go read the instructions from here](https://dotnet.microsoft.com/en-us/download).

After installing the .NET core, go ahead and install the Visual Studio code [from here](https://code.visualstudio.com/download).

Go to your projects folder from your terminal.

```
$ cd /path to your projects folder/
```
In that make a new directory named "hello-world".

```
$ mkdir hello-world
```
After making a directory, open Visual Studio Code and then open the `hello-world` directory from there.

Open the terminal in Visual Studio code by pressing "CTRL + Shift \` ". Then from the terminal make a new console application in Visual Basic with this command:

```
$ dotnet new console -lang "VB"
```
This will create a set of files:

```
.
├── hello-world.vbproj
├── obj
│   ├── hello-world.vbproj.nuget.dgspec.json
│   ├── hello-world.vbproj.nuget.g.props
│   ├── hello-world.vbproj.nuget.g.targets
│   ├── project.assets.json
│   └── project.nuget.cache
└── Program.vb
```

And the `Program.vb` will contain this code:

```
Imports System

Module Program
    Sub Main(args As String())
        Console.WriteLine("Hello World!")
    End Sub

End Module
```

And that's it! That's your first VB program in Linux with .NET core.

To run this program, simply type in the terminal:

```
$ dotnet run
```
And it will output:

```
Hello World!
```
Now, let's understand the program shall we?

The program starts with `Imports System`.  In here, `Imports` is a statement that inherits a specified namespace. Here the namespace `System` is mentioned, so it inherits `System` namespace. `System` is a namespace that has all the basic classes, reference data types, events, attributes, and many inbuilt functions that are required to run any basic program.

The second line of the program has a statement called `Module`. It says the VB.NET file name. Since VB.NET is an object-oriented language any program your write will have a module or a class that contains data and procedures within it.

```
Module Module1  
End Module
```
We can make more than one procedure in classes and modules. Usually, a procedure has the executable code to run. A procedure can contain any of the following functions:

* function
* operator
* sub 
* get
* set
* AddHandler
* RemoveHandler


When we see the next line we have the `Main()` method. Every program in Visual Basic should have a `Main()` method.  It represents the starting point of any Visual Basic program. 

Inside `Main()` method there is `Console.WriteLine` which is a method in console class. It is utilized to print any text or messages in the application.

If you need more elaborate tutorials on how to install .NET core and Visual Studio Code on Ubuntu then comment, and I will post another article explaining that.

