---
title: A*
tags: p5.js, algorithms
date: 2020-07-18 00:00
description: The A* pathfinding algorithm searching dynmically through a grid of tiles
image: images/projects/p5/astar.png
---
#  A*

<div id="canvas" style="height: 500px; margin-bottom: 1em;"></div>

<p><a href="https://github.com/shivam-sh/shivam-sh.github.io/tree/master/Resources/assets/a*" class="button special" style="margin: 1em 0 0 0">View Source</a>
<a href="../../../assets/a*/index.html" class="button" style="margin: 1em 0 0 0">Fullscreen</a></p>

A* is a simple graphical implementation of the a* search algorithm.

This program generates a randomized set of tiles finds the quickest path to the end.
Unlike other implementations of the algorithm this one doesn't rely on a previously generated network of linked nodes. Due to the simplified tile system the program can generate the connections between nodes during runtime.

The algorithm behaves like a modified version of Edsger Djikstra's algorithm. Djikstra's algorithm tries to find the shortest path to any given node by searching in all directions, this often results in a "tree" that determines the shortest path to any given node from the source. 

The difference between the two approaches is that the a* algorithm uses a heuristic to determine which nodes are worth visiting in order to improve performance. The a* algorithm takes into account the theoretical quickest path to the end. By doing so it knows to search the paths that lead closer to the end first. This lets the algorithm know when it is going down a path that is less efficient than expected so it knows to look somewhere else instead.

Shivam Sh

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js"></script>
<script type="text/javascript" src="../../../assets/a*/sketch.js"></script>
<script type="text/javascript" src="../../../assets/a*/node.js"></script>