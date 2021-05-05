const Sketch = (p) => {
  // Grid Options
  let percentFilled = 40;
  let nodeHeight = 30;
  let nodeWidth = 30;

  function heuristic(node) {
    // Calculate the theoretical shortest distance to the finish
    let distance = p.dist(
      node.column * nodeWidth,
      node.row * nodeHeight,
      finish.column * nodeWidth,
      finish.row * nodeHeight
    );

    // Return a slight underestimate of the actual distance to the finish
    // (Returning an overestimate would reduce the chances of finding the shortest path greatly)
    return (distance + (distance * percentFilled) / 100) * 0.85;
  }

  // GLOBAL VARIABLES
  let queue = [];
  let closed = [];

  let grid;
  let columns;
  let rows;

  let start;
  let finish;

  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(700, 460);
    p.windowResized();
    p.background(0, 0, 0);
    p.frameRate(20);

    // Setup values for grid
    columns = p.floor(canvas.width / nodeWidth);
    rows = p.floor(canvas.height / nodeHeight);

    // Create 2D grid
    grid = new Array(columns);
    for (let i = 0; i < columns; i++) {
      grid[i] = new Array(rows);
    }

    // Create storage for nodes
    queue = [];
    closed = [];

    // Fill the grid with nodes based on the % that should be open
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        if (Math.random() * 100 > percentFilled) {
          grid[x][y] = new MapNode(x, y, nodeWidth, nodeHeight, states.OPEN);
        } else {
          grid[x][y] = new MapNode(x, y, nodeWidth, nodeHeight, states.BLOCKED);
        }
      }
    }

    // Set/init start and end points
    start = grid[p.floor(columns / 10)][p.floor(rows / 10)];
    finish =
      grid[columns - 1 - p.floor(columns / 10)][rows - 1 - p.floor(rows / 10)];
    start.setState(states.START);
    finish.setState(states.FINISH);

    start.g = 0;
    start.h = heuristic(start);
    start.f = start.g + start.h;

    // Add the start node to the queue
    queue.push(start);

    // Output the base grid
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        grid[x][y].show();
      }
    }
  };

  p.draw = () => {
    if (queue.length > 0) {
      // Run main search loop
      let currentNode = queue[0];
      let newNodes = currentNode.getConnections(grid);

      // Check if done
      if (currentNode == finish && start.state != states.SUCCESS) {
        while (currentNode.cameFrom != undefined) {
          currentNode.setState(states.SUCCESS);
          currentNode.show();
          currentNode = currentNode.cameFrom;
        }
        start.setState(states.SUCCESS);
        start.show();
      } else if (start.state != states.SUCCESS) {
        // Remove current node from queue
        if (currentNode.state != states.START) {
          currentNode.setState(states.CLOSED);
          currentNode.show();
        }
        closed.push(currentNode);
        queue.shift();

        // Insert each connection into the queue according to its f value
        newNodes.forEach((node) => {
          // Calculate the distance to this node (from the start)
          let tempG =
            currentNode.g +
            p.dist(
              currentNode.column * nodeWidth,
              currentNode.row * nodeHeight,
              node.column * nodeWidth,
              node.row * nodeHeight
            );

          // Save this path if it is faster than any previous
          if (tempG < node.g) {
            node.cameFrom = currentNode;
            node.g = tempG;
            node.h = heuristic(node);
            node.f = node.g + node.h;
          }

          // Add the node to the queue and sort
          queue.push(node);
          queue.sort((a, b) => a.f - b.f);
          node.setState(states.QUEUED);
          node.show();
        });
      }
    } else if (start.state != states.SUCCESS && start.state != states.FAILED) {
      // Search failed
      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          if (grid[x][y].state == states.CLOSED) {
            grid[x][y].setState(states.FAILED);
            grid[x][y].show();
          }
        }
      }
    }
  };

  p.windowResized = () => {
    if (p.windowWidth > 800) {
      p.resizeCanvas(700, 460);
    } else {
      p.resizeCanvas(p.windowWidth - 72, 460);
    }

    p.background(0);

    // Output the grid
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        grid[x][y].show();
      }
    }
  };

  // Reload the sketch if clicked
  p.mousePressed = () => {
    p.setup();
  };

  // Create an object to contain the possible states of a node
  const states = {
    OPEN: 'open',
    BLOCKED: 'blocked',
    START: 'start-node',
    GOAL: 'goal-node',
    QUEUED: 'queued',
    CLOSED: 'closed',
    SUCCESS: 'success',
    FAILED: 'failed',
  };

  class MapNode {
    // Create a new node based on size, location, and state
    constructor(c, r, w, h, state) {
      // f, g, and h values
      this.f = Infinity;
      this.g = Infinity;
      this.h = Infinity;

      // Array to store all connections
      this.connected = [];

      // Reference to previous node
      this.cameFrom = undefined;

      // Data for visuals
      this.column = c;
      this.row = r;
      this.width = w;
      this.height = h;
      this.state = state;
    }

    // Draws the visual representation of a node
    show() {
      // Choose the colour based on the current state
      switch (this.state) {
        case states.OPEN:
          p.fill(255, 255, 255);
          break;
        case states.BLOCKED:
          p.fill(50, 50, 50);
          break;
        case states.START:
          p.fill(100, 100, 250);
          break;
        case states.FINISH:
          p.fill(100, 100, 250);
          break;
        case states.QUEUED:
          p.fill(255, 200, 100);
          break;
        case states.CLOSED:
          p.fill(150, 150, 150);
          break;
        case states.SUCCESS:
          p.fill(50, 200, 50);
          break;
        case states.FAILED:
          p.fill(200, 100, 100);
          break;
      }
      p.strokeWeight(1);
      p.stroke(0, 0, 0, 20);

      // Get infomation about the current canvas
      let canvasWidth = canvas.width;
      let canvasHeight = canvas.height;

      // Resize the grid based on the current canvas size
      this.width = nodeWidth;
      this.height = nodeHeight;
      if (columns * this.width > canvasWidth) {
        let scale = (columns * nodeWidth) / canvasWidth;
        this.width /= scale;
        this.height /= scale;
      }
      if (rows * this.height > canvasHeight) {
        this.width = nodeWidth;
        this.height = nodeHeight;

        let scale = (rows * nodeHeight) / canvasHeight;
        this.width /= scale;
        this.height /= scale;
      }

      // Centre the grid on the canvas and draw the node
      let xOffset = (canvasWidth - this.width * columns) / 2;
      let yOffset = (canvasHeight - this.height * rows) / 2;
      p.rect(
        this.column * this.width + xOffset,
        this.row * this.height + yOffset,
        this.width,
        this.height
      );
    }

    // Returns an array with a list of connected nodes
    getConnections(grid) {
      // If the connections aren't already initialized, do so now
      if (!this.connected == []) {
        // Check/add the node to the top-left
        if (
          this.row != 0 &&
          this.column != 0 &&
          (grid[this.column - 1][this.row - 1].state == states.OPEN ||
            grid[this.column - 1][this.row - 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column - 1][this.row - 1]);
        }

        // Check/add the node to the top
        if (
          this.row != 0 &&
          (grid[this.column][this.row - 1].state == states.OPEN ||
            grid[this.column][this.row - 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column][this.row - 1]);
        }

        // Check/add the node to the top-right
        if (
          this.row != 0 &&
          this.column != grid.length - 1 &&
          (grid[this.column + 1][this.row - 1].state == states.OPEN ||
            grid[this.column + 1][this.row - 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column + 1][this.row - 1]);
        }

        // Check/add the node to the left
        if (
          this.column != 0 &&
          (grid[this.column - 1][this.row].state == states.OPEN ||
            grid[this.column - 1][this.row].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column - 1][this.row]);
        }

        // Check/add the node to the right
        if (
          this.column != grid.length - 1 &&
          (grid[this.column + 1][this.row].state == states.OPEN ||
            grid[this.column + 1][this.row].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column + 1][this.row]);
        }

        // Check/add the node to the bottom-left
        if (
          this.row != grid[0].length - 1 &&
          this.column != 0 &&
          (grid[this.column - 1][this.row + 1].state == states.OPEN ||
            grid[this.column - 1][this.row + 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column - 1][this.row + 1]);
        }

        // Check/add the node to the bottom
        if (
          this.row != grid[0].length - 1 &&
          (grid[this.column][this.row + 1].state == states.OPEN ||
            grid[this.column][this.row + 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column][this.row + 1]);
        }

        // Check/add the node to the bottom-right
        if (
          this.row != grid[0].length - 1 &&
          this.column != grid.length - 1 &&
          (grid[this.column + 1][this.row + 1].state == states.OPEN ||
            grid[this.column + 1][this.row + 1].state == states.FINISH)
        ) {
          this.connected.push(grid[this.column + 1][this.row + 1]);
        }

        // Return the array of connected nodes
        return this.connected;
      } else {
        // Return the previously connected nodes
        return this.connected;
      }
    }

    // Changes the state of the node
    setState(state) {
      this.state = state;
    }

    // Sets the cameFrom variable to a new node
    setCameFrom(node) {
      this.cameFrom = node;
    }
  }
};
export default Sketch;
