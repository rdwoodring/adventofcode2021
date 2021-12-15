// import {
//     input
// } from '../tempInput.js';

import {
    input
} from '../input.js';

import Octopus from '../Octopus.js';

let flashCounter = 0,
    flashedOctopi = [];

function getAdjacentOctopi(octopus) {
    const {
            x,
            y
        } = octopus,
        adjacentCoords = [
            `${x - 1},${y - 1}`,
            `${x},${y - 1}`,
            `${x + 1},${y - 1}`,
            `${x - 1},${y}`,
            `${x + 1},${y}`,
            `${x - 1},${y + 1}`,
            `${x},${y + 1}`,
            `${x + 1},${y + 1}`
        ];

    return adjacentCoords.map(coord => octopiMap[coord]).filter(selectedOctopus => selectedOctopus !== undefined);
}

function handleFlash(flasher) {
    flashCounter += 1;
    flashedOctopi.push(flasher);

    getAdjacentOctopi(flasher).forEach(octopus => octopus.boostEnergy());
}

function prettyPrintOctopi() {
    return Array.from({length: 10}).reduce((acc, val, y) => {
        const str = Array.from({length: 10}).map((valInner, x) => octopiMap[`${x},${y}`].energy);

        return `${acc}${str.join('')}\n`
    }, '')
}

const rows = input.split('\n'),
    octopi = rows.reduce((acc, row, y) => {
        return [...acc, ...row.split('').map((energy, x) => new Octopus(x, y, energy, handleFlash))]
    }, []),
    octopiMap = octopi.reduce((acc, octopus) => {
        return {
            ...acc,
            [`${octopus.x},${octopus.y}`]: octopus
        }
    }, {});

for (let i = 0; i < 100; i++) {
    octopi.forEach(octopus => octopus.tick());

    flashedOctopi.forEach(octopus => octopus.energy = 0);

    flashedOctopi = [];
    // flashedOctopi.reduce((acc, flashed) => {

    // },flashedOctopi)

    console.log(prettyPrintOctopi());
    console.log();
}

// console.log(prettyPrintOctopi());
console.log(flashCounter);