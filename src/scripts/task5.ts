function evaluateBinary() {
  const input = (document.getElementById('binaryInput') as HTMLInputElement).value;
  if (!/^[01]+$/.test(input)) return alert('Csak bináris karakterek (0 és 1) engedélyezettek!');

  const onesCount = [...input].filter((char) => char === '1').length;
  const zerosCount = input.length - onesCount;

  const longestSeq = (char: '0' | '1') => Math.max(...(input.match(new RegExp(`${char}+`, 'g')) || ['']).map((s) => s.length));
  const longestAltSeq = Math.max(...(input.match(/(01|10)+/g) || ['']).map((s) => s.length));

  let longestRepeatedSeq = 0;
  for (let len = 1; len <= input.length / 2; len++) {
    const subs = new Set<string>();
    for (let i = 0; i <= input.length - len; i++) {
      const sub = input.substr(i, len);
      if (subs.has(sub)) {
        longestRepeatedSeq = len;
        break;
      }
      subs.add(sub);
    }
  }

  document.getElementById('results')!.innerHTML = `
                <p>1-ek száma: ${onesCount}</p>
                <p>0-k száma: ${zerosCount}</p>
                <p>Leghosszabb 1-es sorozat: ${longestSeq('1')}</p>
                <p>Leghosszabb 0-ás sorozat: ${longestSeq('0')}</p>
                <p>Leghosszabb váltakozó sorozat: ${longestAltSeq}</p>
                <p>Leghosszabb ismétlődő részsorozat: ${longestRepeatedSeq}</p>
            `;
}

function generateRandomBinary() {
  const length = +(document.getElementById('randomLength') as HTMLInputElement).value;
  if (length <= 0) return alert('Adj meg egy érvényes hosszot!');

  (document.getElementById('binaryInput') as HTMLInputElement).value = Array.from({ length }, () => (Math.random() < 0.5 ? '0' : '1')).join('');
}
