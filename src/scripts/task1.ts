function calculateDivisors(num: number): number {
  let count = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) count++;
  }
  return count;
}

function calculate(): void {
  const inputElement = document.getElementById('input-number') as HTMLInputElement;
  const resultElement = document.getElementById('numbers-result') as HTMLDivElement;
  resultElement.innerHTML = '';

  const number = parseInt(inputElement.value);
  if (number < 2 || number > 100) {
    resultElement.innerHTML = 'Csak 2 és 100 közötti számot adhat meg!';
    return;
  }

  const divisorsOfInput = calculateDivisors(number);
  console.log({ divisorsOfInput });
  for (let i = 2; i <= 100; i++) {
    if (calculateDivisors(i) < divisorsOfInput) resultElement.innerHTML += `${i} `;
  }
}
