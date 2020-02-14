// input: array of children, grid
// output: array of children that are in-bounds of the grid
function check_valid_boundries(cells, grid) {
  cells = cells.filter(cell => cell.x >= 0 && cell.y >= 0 && cell.x <= grid.x_boundary && cell.y <= grid.y_boundary)
  return cells
}

function check_walls(cells, walls) {
  cells = cells.filter(cell => !walls.some(w => Cell.equal(w, cell)))
  return cells
}

// input: array of children, explored
// output: array of children that haven't been explored yet
function check_explored(cells, explored) {
  cells = cells.filter(cell => !explored.some(e => Cell.equal(e, cell)))
  return cells
}

// input: array of children, frontier
// output: array of children not in the frontier
function check_frontier(cells, frontier) {
  new_cells = []
  cells.forEach(cell => {
    if (!frontier.some(f => Cell.equal(f, cell))) {
      new_cells.push(cell)
    } else {
      // already in the frontier, change parent if this is smaller path
      const duplicate = frontier.find(f => Cell.equal(f, cell))
      if (duplicate.parent.num_steps > cell.num_steps) {
        duplicate.parent = cell
      }
    }
  })
  return new_cells
}

// input: array of children, frontier
// output: frontier with children added
function add_to_frontier(cells, frontier) {
  combined = [...frontier, ...cells]
  return combined
}

// remove from frontier, add to explored, return cell
function deque_frontier_add_explored(frontier, explored) {
  let cell = frontier.shift()
  explored.push(cell)
  return cell
}

// checks if a cell is the goal
function goal_test(cell, goal) {
  return Cell.equal(cell, goal)
}

// expand the cell into its children, up, down, left, right
function expand(cell) {
  let children = []
  children.push(new TreeCell(cell.x - 1, cell.y, cell, cell.num_steps + 1))
  //children.push(new TreeCell(cell.x - 1, cell.y - 1, cell, cell.num_steps + 1))
  children.push(new TreeCell(cell.x, cell.y - 1, cell, cell.num_steps + 1))
  //children.push(new TreeCell(cell.x + 1, cell.y - 1, cell, cell.num_steps + 1))
  children.push(new TreeCell(cell.x + 1, cell.y, cell, cell.num_steps + 1))
  //children.push(new TreeCell(cell.x + 1, cell.y + 1, cell, cell.num_steps + 1))
  children.push(new TreeCell(cell.x, cell.y + 1, cell, cell.num_steps + 1))
  //children.push(new TreeCell(cell.x - 1, cell.y + 1, cell, cell.num_steps + 1))
  return children
}

// BFS
function BFS() {
    let cell = deque_frontier_add_explored(SEARCHER_GLOBAL.frontier, SEARCHER_GLOBAL.explored)
    if (goal_test(cell, SEARCHER_GLOBAL.goal)) {
      SEARCHER_GLOBAL.solution = cell
      return true
    }
    let children = expand(cell)
    children = check_valid_boundries(children, SEARCHER_GLOBAL.grid)
    children = check_walls(children, SEARCHER_GLOBAL.walls)
    children = check_explored(children, SEARCHER_GLOBAL.explored)
    children = check_frontier(children, SEARCHER_GLOBAL.frontier)
    SEARCHER_GLOBAL.frontier = add_to_frontier(children, SEARCHER_GLOBAL.frontier)
    return false
}

// push start onto the frontier
SEARCHER_GLOBAL.frontier.push(SEARCHER_GLOBAL.start)

// start BFS for testing
// BFS()
