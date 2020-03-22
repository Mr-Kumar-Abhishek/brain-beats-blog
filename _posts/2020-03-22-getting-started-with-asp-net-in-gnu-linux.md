---
layout: post
title: "Getting started with ASP.NET in GNU/Linux"
description: This article is intended for users who understand the fundamentals of Linux and are running their implementation of Linux on a computer with an ARM processor. The readers may still find this useful as an general introduction to ASP.NET.
subject: Getting started with ASP.NET in GNU/Linux
apple-title: Getting started with ASP.NET in GNU/Linux
app-name: ASP.NET in ARM systems
tweet-title: Getting started with ASP.NET in GNU/Linux
tweet-description: This article is intended for users who understand the fundamentals of Linux and are running their implementation of Linux on a computer with an ARM processor. The readers may still find this useful as an general introduction to ASP.NET.
og-title: Getting started with ASP.NET in GNU/Linux
og-url: https://mr-kumar.tk/blog/2020/03/22/making-first-program-with-qt-and-c-plus-plus
canonical-url: https://mr-kumar.tk/blog/2020/02/29/getting-started-with-asp-net-in-gnu-linux
date: 2020-03-22
keywords: Abhishek Kumar, Software Engineer, ASP.NET, Linux, ARM, .NET, core
---

To get started with ASP.NET on GNU/Linux systems we are going to use a free and open-source computer software framework called .NET core. .NET core is an open-source and cross-platform version of the old .NET. It has all aspects of .NET including class libraries, runtime, languages,  compilers, Windows desktop frameworks, ASP.NET Core web framework, and Entity Framework Core data access library.

<br>
#### Intended Audience

This article is intended for users who understand the fundamentals of Linux and are running their implementation of Linux on a computer with an ARM processor.

The readers may still find this useful as an general introduction to ASP.NET

<br>

### Installation of .NET core

To install .NET Core in your Linux Distro, you could follow the [comprehensive guide provided by Microsoft](https://docs.microsoft.com/en-us/dotnet/core/install/sdk?pivots=os-linux). If your Linux Distro is not following the most commonly used setup similar to Debian, Ubuntu, CentOS, RHEL, SLES or openSUSE then you cannot install the SDK with your package manager. Also, a limitation exists that the installation of .NET core SDK with package manager only works on a computer with x64 architecture in hardware. 

For most students though, schools and universities provide cheap Laptops and computers made in ARM architecture. If such is the case, then you have to install a .NET Core SDK manually. It is suggested that one should download the binaries specific to their computer hardware architecture and not compile the whole SDK from the [source code](https://github.com/dotnet/core), as most computers in ARM architectures are slow in compiling due to their low clock speed. For this article, I have downloaded the stable release of [.NET core SDK version 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1).  The downloaded file should be kept in your home folder of your Linux System.  After which run the following commands so that all the binaries get extracted from the compressed file and run through your bash terminal.

```
$ mkdir -p $HOME/dotnet && tar zxf dotnet-sdk-3.1.102-linux-arm.tar.gz -C $HOME/dotnet
$ export DOTNET_ROOT=$HOME/dotnet
$ export PATH=$PATH:$HOME/dotnet
```

If you want the usage of `dotnet` command to be persistent after a reboot or after the opening of a new terminal in your user account, add these two lines at the end of `.profile` file of your home directory.

```
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet
```

The above process of downloading and installing .NET core SDK can also be done with [bash automation provided by Microsoft](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script). However, keep in mind that, it may not work on systems that don’t follow the usual file/directory structure and package management similar to Debian, Fedora, openSUSE, RHEL, centOS or Alpine. For example, these automations have higher chances of failure on Puppy Linux Systems or Tiny Core Linux, either due to dependency issues or non-supported Linux distribution-specific assets.

The manual method of installation works on most GNU/Linux systems, including Raspbian running over the ARM SBC.

<br>
### Creating a sample web app with ASP.NET

Creation of a sample web app starts with going into your command shell prompt and entering the following command:

```
$ dotnet new webapp -o aspnetwebapp
```
The above command creates a new web app, in the directory named “aspnetwebapp”. Here, `-o aspnetwebapp` parameter creates a directory named “aspnetwebapp” where all the boilerplate source code files of the app are kept.

For reference, a successful output of the command should show results as it is shown below:

```
The template "ASP.NET Core Web App" was created successfully.
This template contains technologies from parties other than Microsoft, see https://aka.ms/aspnetcore/3.1-third-party-notices for details.

Processing post-creation actions...
Running 'dotnet restore' on aspnetwebapp/aspnetwebapp.csproj...
  Restore completed in 1.86 sec for /home/pi/Documents/projects/aspnetwebapp/aspnetwebapp.csproj.

Restore succeeded.

```
<br>

### Running the ASP.NET web app

To run your newly built ASP.NET web app, first change your directory to it, as such:

```
$ cd aspnetwebapp
```

And then instruct .NET to run it, like this:

```
$ dotnet watch run
```

One would have to wait a while to have the development server started depending on how fast the computer is. I was using a raspberry pi single-board computer with a processor whose clockspeed was only 800MhZ so I had to wait for a minute or two before it started. A successful launch of the server will give output similar to what is shown below:

```
watch : Started
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /home/pi/Documents/projects/aspnetwebapp
```

As from the above output, we could understand that the development web server is listening on two ports, namely `5000` and `5001`, the latter being in an SSL connection. Pointing our web browser to addresses `http://localhost:5000` or `https://localhost:5001` would yield a demo homepage of the project.

![ASP.NET hello world ! image ]({{ site.url }}/img/2020-03-11-152416_1280x1024_scrot.png "ASP.NET Hello world !")

<br>

### Editing a Razor Page

If we open the file `Pages/Index.cshtml` we would find a code similar to what is shown below:

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
</div>

```

To edit this file any text editor can be used. For now, I am using the simple console text editor “vi”.

```
$ vi Pages/Index.cshtml
```

In order to change the code of this Razor page we will remove the following line:

```
<p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
```

And would replace it with this one:

```
    <p>The time on the server is @DateTime.Now</p>
```

Hence the resultant code would look like this:

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>The time on the server is @DateTime.Now</p>
</div>
```

While changing the above code, you should see the terminal running the development web server like this:


```
      Application is shutting down...
watch : Exited
watch : File changed: /home/pi/Documents/projects/aspnetwebapp/Pages/Index.cshtml
watch : Started
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /home/pi/Documents/projects/aspnetwebapp
```

Again, this might take a while depending on the speed of your computer. After which you should get an output page as shown below on refreshing the URL.

![Edited razor page image ]({{ site.url }}/img/2020-03-11-150012_1280x1024_scrot.png "Edited razor page image.")

This just covers the starting steps on how to develop an ASP.NET web app over GNU/Linux systems. For further reading, you could always refer to Microsoft’s developer documentation. 

