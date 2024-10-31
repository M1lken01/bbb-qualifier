function drawLottery(): void {
  const result = document.getElementById('lottery-result') as HTMLDivElement;
  const drawCount = parseInt((document.getElementById('draw-count') as HTMLInputElement).value);
  const pickCount = parseInt((document.getElementById('pick-count') as HTMLInputElement).value);
  const userNumbers = (document.getElementById('user-numbers') as HTMLInputElement).value.split(',').map(Number);

  if (userNumbers.length !== pickCount) {
    result.innerHTML = 'Hibás bemenet!';
    return;
  }

  const drawnNumbers: number[] = [];
  while (drawnNumbers.length < pickCount) {
    const randNum = Math.floor(Math.random() * drawCount) + 1;
    if (!drawnNumbers.includes(randNum)) drawnNumbers.push(randNum);
  }

  const matchCount = userNumbers.filter((num) => drawnNumbers.includes(num)).length;
  result.innerHTML = `Sorsolt számok: ${drawnNumbers.join(', ')}<br>Találatok: ${matchCount}`;
}
