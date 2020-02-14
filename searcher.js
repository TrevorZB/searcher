let cell_size = 20

let canvas_width = window.innerWidth
let canvas_height = window.innerHeight

let canvas = document.getElementById('canvas');
canvas.width = canvas_width
canvas.height = canvas_height
let c = canvas.getContext('2d')

async function draw_solution(cell) {
  let path = []
  cell = cell.parent
  while (cell.num_steps > 0) {
    path.push(cell)
    cell = cell.parent
  }
  while (path.length) {
    await new Promise(r => setTimeout(r, 250))
    let path_cell = path.pop()
    c.fillStyle = 'rgba(139, 69, 19, 1)'
    c.fillRect(path_cell.x * cell_size + 1, path_cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
  }
}

function animate() {
  solution_found = BFS()
  if(solution_found) {
    draw_solution(SEARCHER_GLOBAL.solution)
    return
  }

  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas_width, canvas_height);
  for (let i = 0; i < SEARCHER_GLOBAL.grid.width; i++) {
    for (let j = 0; j < SEARCHER_GLOBAL.grid.height; j++) {
      let cell = new TreeCell(i, j, null, 0)
      c.beginPath()
      c.lineWidth = '1'
      c.strokeStyle = 'black'
      c.rect(cell.x * cell_size, cell.y * cell_size, cell_size, cell_size)
      c.stroke()
      if (Cell.equal(SEARCHER_GLOBAL.start, cell)) {
        c.fillStyle = 'rgba(0, 255, 0, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      } else if (Cell.equal(SEARCHER_GLOBAL.goal, cell)) {
        c.fillStyle = 'rgba(0, 255, 0, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      } else if (SEARCHER_GLOBAL.explored.some(e => Cell.equal(e, cell))) {
        c.fillStyle = 'rgba(0, 0, 255, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      } else if (SEARCHER_GLOBAL.frontier.some(f => Cell.equal(f, cell))) {
        c.fillStyle = 'rgba(255, 255, 0, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      } else if (SEARCHER_GLOBAL.walls.some(w => Cell.equal(w, cell))) {
        c.fillStyle = 'rgba(255, 0, 0, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      } else {
        c.fillStyle = 'rgba(255, 255, 255, 1)'
        c.fillRect(cell.x * cell_size + 1, cell.y * cell_size + 1, cell_size - 2, cell_size - 2)
      }
    }
  }
}

animate()
