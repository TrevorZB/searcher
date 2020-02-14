class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x_boundary = this.x_boundary()
    this.y_boundary = this.y_boundary()
  }
  x_boundary() {
    return this.width - 1
  }
  y_boundary() {
    return this.height - 1
  }
}

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static equal(cell_one, cell_two) {
    return (cell_one.x == cell_two.x && cell_one.y == cell_two.y)
  }
}

class TreeCell extends Cell {
  constructor(x, y, parent, num_steps) {
    super(x, y)
    this.parent = parent
    this.num_steps = num_steps
  }
}

class WallCell extends Cell {
  constructor(x, y) {
    super(x, y)
  }
}

// global
SEARCHER_GLOBAL = {
  grid: new Grid(20, 20),
  start: new TreeCell(2, 2, null, 0),
  goal: new TreeCell(2, 18, null, 0),
  solution: null,
  frontier: [],
  explored: [],
  walls: [
    new WallCell(0, 6), new WallCell(1, 6), new WallCell(2, 6), new WallCell(3, 6), new WallCell(4, 6), new WallCell(5, 6), new WallCell(6, 6), new WallCell(7, 6), new WallCell(8, 6),
    new WallCell(6, 9), new WallCell(7, 9), new WallCell(8, 9), new WallCell(9, 9), new WallCell(10, 9), new WallCell(11, 9), new WallCell(12, 9), new WallCell(13, 9), new WallCell(14, 9)
  ]
}
