---
title: Terra
date: 2020-07-31
description: An interactive 3D terrain generator explorable world built using p5.js and WebGL
tags: p5.js, graphics
---

# Terra

<div id="canvas" class="canvas"></div>
<p>
  <a href="https://github.com/shivam-sh/Terra" class="button">
    View Source
  </a>
  <a href="https://shivam-sh.github.io/Terra" class="button">
    Fullscreen
  </a>
</p>

Terra is a terrain generator built using WebGL and p5.js.

This project is a sort of test platform that I'm using to explore and push the limits of what I can run smoothly on top of p5.js. Low-level graphics processing has recently piqued my interest. I'm using this library as an abstraction on WEBGL to gain a basic understanding of 3D graphics before diving deep to learn more.

WebGL was my testbed of choice due to the wide variety of devices that it supports. This project runs on the internet and is reachable across most of the platforms that I use. I can therefore try to optimize my graphics rendering in a general use case with WebGL. I can then compare the results I get to the output when I develop for a specific platform or device in the future.

I intend to gradually add features over time to see how much I can improve this program while maintaining compatibility and performance.

I've added terrain caching and rendering based on the camera's location.
My next plan is to increase user interaction by reconstructing the camera. Currently, it behaves like an observer, looking over the landscape. I plan on improving this by making it travel through the landscape instead, as an explorer.

Shivam Sh

<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js"
></script>

<script
  type="text/javascript"
  src="https://shivam-sh.github.io/Terra/sketch.js"
></script>

<script
  type="text/javascript"
  src="https://shivam-sh.github.io/Terra/terrain.js"
></script>
