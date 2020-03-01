---
layout: post
title: "Artificial Neural Network creates 3D object from a single image"
description: This article discusses for artificial neural network algorithm which could create 3D object from a single image
subject: Artificial Neural Network creates 3D object from a single image
apple-title: Artificial Neural Network creates 3D object from a single image
app-name: Artificial Neural Network creates 3D object from a single image
tweet-title: Artificial Neural Network creates 3D object from a single image
tweet-description: This article discusses for artificial neural network algorithm which could create 3D object from a single image
og-title: Artificial Neural Network creates 3D object from a single image
og-url: https://mr-kumar.tk/blog/2020/03/01/ann-creates-3d-object-from-a-single-image
canonical-url: https://mr-kumar.tk/blog/2020/03/01/ann-creates-3d-object-from-a-single-image
date: 2020-03-01
keywords: Abhishek Kumar, Software Engineer, Software Developer, artificial neural network, AI, Abhishek, Kumar, Site, artificial intelligence
---

Usually in computer graphics research we spend most of our time dealing with images. If we take an image file, it is just displayed as a collection of 2D pixels following a pattern on a 2D plane. This is of course a very tiny window to look into the reality as the reality is actually 3D. For us humans it is easy to understand because when we look at the 3D image, we see the geometric structure that it portrays.

Now if we show an image of an object and ask a human to imagine himself rotating around it, he would do a pretty good job at that. On the other hand, when we talk about a computer algorithm, it would be an extremely difficult task to extract a 3D structure. So my question is that, can we use artificial neural network based learning algorithms to accomplish anything substantial. 

I got my answer from [a paper](https://nv-tlabs.github.io/DIB-R/). It talks about these new techniques that take a 2D image as an input and tries to guess three particular things. The most fascinating part is that the geometry problem we talked about just now is only the first one. After this is also guesses what are lighting conditions, that it gives an appearance like the presented image. And lastly it guesses the texture map of the object as well. This is already beyond our expected imaginations but there is more. If we put all this into a rendering software we could also adjust the different camera positions. These camera positions can be different from the one that was there in the input image. So what does this entails finally ?

It means that it could not only generate the light, texture and geometry but when put all this together, it could make a photo out of it from any viewpoint.

These techniques can be used in enhancing depth perception capabilities of robots and wherever we would like to build a virtual world when we only have 2D pictures of it. From the application of this, we could quickly get to a starting point from a texture information. Only thing left are the fine details which could be covered by an artist. One may see some discolouration in application of this, however two more papers, and it would be resolved significantly.

The paper’s name is “Learning to Predict 3D Objects with an Interpolation-based Differentiable Renderer” . [And this is the link to the paper](https://nv-tlabs.github.io/DIB-R/).


