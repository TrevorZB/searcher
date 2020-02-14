// remove from frontier, add to explored, return cell
function pop_frontier_add_explored(frontier, explored) {
  let cell = frontier.pop()
  explored.push(cell)
  return cell
}

function DFS() {
  let cell = pop_frontier_add_explored(SEARCHER_GLOBAL.frontier, SEARCHER_GLOBAL.explored)
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
