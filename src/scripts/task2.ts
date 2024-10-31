function drawMap(): void {
  const inputElement = document.getElementById('map-input') as HTMLTextAreaElement;
  const outputElement = document.getElementById('map-output') as HTMLDivElement;
  outputElement.innerHTML = '';

  const lines = inputElement.value.trim().split('\n');
  const [width, height] = lines[0].split(' ').map(Number);
  const mapData = lines.slice(1).flatMap((line) => line.split(' ').map(Number));

  if (mapData.length !== width * height) {
    outputElement.innerHTML = 'Hibás bemenet!';
    return;
  }

  const table = document.createElement('table');
  for (let i = 0; i < height; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('td');
      cell.style.width = '20px';
      cell.style.height = '20px';
      cell.style.backgroundColor = mapData[i * width + j] === 1 ? 'black' : 'white';
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  outputElement.appendChild(table);
}
