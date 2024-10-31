let currentPlayer: 0 | 1 = 0;
let playerStats = { 0: 0, 1: 0 };

//! holy fuck. good luck debugging this shit
//! worst function i have ever written tbh
function createGrid() {
  const parent = document.getElementById('game') as HTMLDivElement;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('div');
      if (i % 2 === 0) {
        if (j % 2 !== 0) {
          cell.dataset.h = String(1);
          cell.innerText = '---';
        }
      } else {
        if (j % 2 === 0) {
          cell.dataset.v = String(1);
          cell.innerText = '|';
        } else {
          cell.dataset.cell = String(1);
        }
      }
      if (cell.dataset.v == '1' || cell.dataset.h == '1') {
        cell.addEventListener('click', () => {
          if (cell.dataset.owner === undefined) {
            cell.dataset.owner = String(currentPlayer);
            let keepTurn = false;
            const idx = [...cell.parentElement!.children].indexOf(cell);

            getNeighboringCells(idx).forEach((index) => {
              const item = parent.children[index] as HTMLDivElement;
              if (item.dataset.cell !== undefined) {
                console.log(item.dataset.cell);
                const allSides = getNeighboringCells([...item.parentElement!.children].indexOf(item)).every(
                  (idx) => (parent.children[idx] as HTMLDivElement).dataset.owner !== undefined,
                );
                if (allSides) {
                  item.dataset.owner = String(currentPlayer);
                  item.innerText = 'x';
                  playerStats[currentPlayer]++;
                  keepTurn = true;
                }
              }
            });

            if (!keepTurn) currentPlayer = Number(!currentPlayer) as 0 | 1;
          }
        });
      }
      parent.appendChild(cell);
    }
  }
}

function getNeighboringCells(idx: number): number[] {
  const rows = 7;
  const cols = 7;
  const neighbors: number[] = [];
  const row = Math.floor(idx / cols);
  const col = idx % cols;
  const directions = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];
  for (const { r, c } of directions) {
    const newRow = row + r;
    const newCol = col + c;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) neighbors.push(newRow * cols + newCol);
  }
  return neighbors;
}

createGrid();
