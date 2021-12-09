// import {
//     input
// } from '../tempInput.js';

import {
    input
} from '../input.js';

const sorted = input.map(Number).sort((a, b) => a - b),
    [first] = sorted,
    [last] = sorted.reverse();

let bestFuel = Infinity,
    bestPosition;

for (let i = first; i <= last; i++) {
    const fuelTotal = input.reduce((acc, inputItem) => {
        const moveDistance = Math.abs(inputItem - i),
            fuelBurn = Array.from({length: moveDistance}).reduce((innerAcc, val, idx) => innerAcc + idx + 1, 0);

        return acc + fuelBurn;
    }, 0);

    if (fuelTotal < bestFuel) {
        bestFuel = fuelTotal;
        bestPosition = i;
    }
}

console.log(bestFuel)
console.log(bestPosition)