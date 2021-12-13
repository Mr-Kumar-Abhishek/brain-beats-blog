---
layout: post
title: "Generating monaural beats from javascript"
description: Here I demonstrate on how to produce monaural beats from use of javascript.
subject: Generating monaural beats from javascript
apple-title: Producing monaural beats from javascript
app-name: How to make monaural beats from javascript
tweet-title: Generating Monaural beats from from javascript
tweet-description: Demonstration on how to produce monaural beats from javascript.
og-title: generate monoural beats from javascript
og-url: https://mr-kumar-abhishek.github.io/blog/2019/11/06/generating-monaural-beats-from-javascript
canonical-url: https://mr-kumar-abhishek.github.io/blog/2019/11/06/generating-monaural-beats-from-javascript
date: 2019-11-6
keywords: monaural beats, brain beats, binaural beats, javascript
---

Recently I have been working on a project called [brain beats](https://brain-beats.netlify.com) which is brain wave entertainment portal. For the uninitiated, brainwave entertainments are methods to stimulate brain into entering to a specific state of mind by using pulsing sound, light or electromagnetic fields.

These are mainly used for guided meditations. Most popular method of attaining brainwave entertainment is by using binaural beats which are just auditary illusions percived by a human when two sine waves are produced to the listener dichotically.

Although, it is the most popular method brainwave entertainment, it is also the least effective from other forms, say as in comparing with monaural beats [Dave Siever](https://mindalive.com/pages/about-dave-siever) said:

<blockquote>
	<p>"Monaural beats do impact thalamus, and therefore the cortex because they are in beat before they strike the ear drum "</p>
	<cite> - <a href="https://mindalive.com/pages/about-dave-siever">Dave Siever</a></cite>
</blockquote>
<br>

Now, to generate monaural beats we have to generate two sine waves from javascript with the help of `BaseAudioContext` of [Web audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) , since monaural beats are produced by mixing two tones of different frequencies. However contrary to binaural beats this occures outside of ears.

To start off, we have to first create a web audio api context.

```
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
```

Keep in mind that, depending on whether the browser is based on chromium (having webkit engine) or based on firefox ( having gecko engine ) the creation of the new object differs.

After creation of web audio context api, next we have to set up two oscillators which will produce sine waves at different frequency.

```
monaural_oscillator_1 = audioCtx.createOscillator();
monaural_oscillator_2 = audioCtx.createOscillator();
```

These oscillators right now doesn't have any specified wave forms that they will produce. The web audio context api gives us the following prebuilt wave forms for us to utilize. These are:

* [sine wave](https://en.wikipedia.org/wiki/sine%20wave)
* [square wave](https://en.wikipedia.org/wiki/square%20wave) with a [duty cycle](https://en.wikipedia.org/wiki/duty%20cycle) of 0.5
* [sawtooth wave](https://en.wikipedia.org/wiki/sawtooth%20wave)
* [triangle wave](https://en.wikipedia.org/wiki/triangle%20wave)
* Custom which could be implemented via [setPeriodicWave()](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/setPeriodicWave)

In our case, we will be only using two pure sine waves for generation of the monaural beats. These could be set by following code:

```
monaural_oscillator_1.type = "sine";
monaural_osicllator_2.type = "sine";
```

To set the different frequencies we could specify its values as such:

```
monaural_oscillator_1.frequency.setValueAtTime("639", audioCtx.currentTime);
monaural_oscillator_2.frequency.setValueAtTime("645", audioCtx.currentTime);
```

The above code sets two frequency against the current time one of 639 hz and other of 645 hz. The resultant sound that would be produced by it will be 6 hz of monaural beats.

After these are done we could go ahead and start the oscillator which will produce the monaural beats.

```
monaural_oscillator_1.start()
monaural_oscillator_2.start()
```

However, since the default volume of the these sounds are usually too high it is better to connect these with some sort of volume control method. The web audio api provides us with [`createGain()`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain) method in order to control the volume.

For control of volume of these two oscillators we declare two variables as such:

```
  var volume_1 = audioCtx.createGain();
  var volume_2 = audioCtx.createGain();
```

Then we have to connect them with the two oscillators:

```
monaural_oscillator_1.connect(volume_1);
monaural_oscillator_2.connect(volume_2);
```
 And finally connect the `createGain()` methods with web audio context.
 
 ```
 volume_1.connect(audioCtx.destination);
 volume_2.connect(audioCtx.destination);
````

After all these are set, we could now at last set the volume of the two oscillators as such:

```
  volume_1.gain.value = 0.3;
  volume_2.gain.value = 0.3;
```

The range of the gain value depends on the system but as thumb rule 0.01 is the least value and 1.00 is its max value.

And lastly this is final code we have made during this tutorial which you could use for refrence:

```
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

monaural_oscillator_1 = audioCtx.createOscillator();
monaural_oscillator_2 = audioCtx.createOscillator();

monaural_oscillator_1.type = "sine";
monaural_osicllator_2.type = "sine";

var volume_1 = audioCtx.createGain();
var volume_2 = audioCtx.createGain();

monaural_oscillator_1.connect(volume_1);
monaural_oscillator_2.connect(volume_2);

volume_1.gain.value = 0.3;
volume_2.gain.value = 0.3;

monaural_oscillator_1.start()
monaural_oscillator_2.start()

```

A much more practical implementions of these concepts can be found in the [brain beats](https://github.com/Mr-Kumar-Abhishek/brain-beats/) repository.
