import './style.css'
import _ from 'lodash';

// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.
let canvas = document.getElementById('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.stroke();

const width = Math.round(1920 / 1)
const height = Math.round(1080 / 1)
const x = 4;
const y = 4;
let alt = true;
const second = 1000;

const createGrid = (width, height, probability) => {
  let grid = new Array(width);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(height);
  }

  const seedGridRandomly = (grid, probability) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = Math.round(Math.random() * 100 / probability) === 1 ? true : false;
      }
    }

    return grid;
  };

  return seedGridRandomly(grid, probability);
};

const draw = () => {
  for (let i = 0; i < width; i += x) {
    for (let j = 0; j < height; j += y) {
      
      ctx.fillStyle = (grid[i / x][j / y] ? '#0e1111' : '#f0f0f0');
      ctx.fillRect(i, j, x, y);
      alt = !alt;
    }
    alt = !alt;
  }
};

const countNeighbours = (i, j, grid) => {
  let count = 0;

  const lowerI = i - 1 === -1 ? grid.length - 1 : i - 1;
  const upperI = i + 1 === grid.length ? 0 : i + 1;

  const lowerJ = j - 1 === -1 ? grid[0].length - 1 : j - 1;
  const upperJ = j + 1 === grid[0].length ? 0 : j + 1;

  count += grid[lowerI][lowerJ];
  count += grid[lowerI][j];
  count += grid[lowerI][upperJ];

  count += grid[i][lowerJ];
  count += grid[i][upperJ];

  count += grid[upperI][lowerJ];
  count += grid[upperI][j];
  count += grid[upperI][upperJ];

  return count;
};

let grid = createGrid(Math.round(width / x), Math.round(height /y), 10);

setInterval(() => {
  const oldgrid = _.cloneDeep(grid);

  for (let i = 0; i < width; i += x) {
    for (let j = 0; j < height; j += y) {
      let status = false;
      let count;
      count = countNeighbours(i / x, j / y, oldgrid);

      if (oldgrid[i / x][j / y]) {
        status = count === 2 || count === 3;
      } else {
        status = count === 3;
      }

      grid[i / x][j / y] = status;
    }
  }

  draw();
}, 0.01 * second);