---
title: A*
date: 2020-07-18
description:
    The A* pathfinding algorithm searching dynamically through a grid of tiles
url: /projects/astar
---

![a-star](/assets/projects/a-star.png)


# A*

[View Source](https://github.com/shivam-sh/p5-experiments/tree/master/sketches/a*)
[Fullscreen](https://shivam-sh.github.io/p5-experiments/subpages/astar.html)

A\* is a simple graphical implementation of the a* search algorithm.

This program generates a randomized set of tiles and finds the quickest path to the end.

Unlike other implementations of the algorithm, this one doesn't rely on a previously generated network of linked nodes. Due to the simplified tile system, the program can index the connections between nodes during runtime.

The algorithm behaves like a modified version of Edsger Djikstra's algorithm. Djikstra's algorithm tries to find the shortest path to any given node by searching in all directions, creating a "tree" that lists the quickest route to any given node from the source.

The difference between the two approaches is that the a\* algorithm uses a heuristic to determine which nodes are worth visiting to improve performance. The algorithm takes into account the theoretical quickest path to the end. Thanks to this heuristic, the algorithm knows to search the nodes that lead closer to the end first. Thanks to this approach, the algorithm knows when it has found an optimal route, as well as when it should keep searching.

Shivam Sh