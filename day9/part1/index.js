import {
    input
} from '../input.js';

// import {
//     input
// } from '../tempInput.js';

function buildCoord(x, y) {
    return `${x},${y}`;
}

const heightMap = input.split('\n').reduce((acc, row, y) => {
    return {
        ...acc,
        ...row.split('').reduce((innerAcc, cell, x) => {
            return {
                ...innerAcc,
                [buildCoord(x, y)]: cell
            }
        }, {})
    }
}, {}),
localLows = Object.entries(heightMap).filter((entry) => {
    function getAdjacent(coordsString) {
        const [
            x,
            y
        ] = coordsString.split(','),
        adjacents = [
            heightMap[buildCoord(Number(x) - 1, Number(y))],
            heightMap[buildCoord(Number(x) + 1, Number(y))],
            heightMap[buildCoord(Number(x), Number(y)- 1)],
            heightMap[buildCoord(Number(x), Number(y) + 1)],
        ];

        return adjacents.filter(adjacent => adjacent !== undefined)
    }

    const [key, value] = entry,
        adjacents = getAdjacent(key),
        lowerCount = adjacents.filter(adjacent => Number(adjacent) <= Number(value)).length;

        if (lowerCount === 0) {
            console.log(value);
            console.log(adjacents)
        }

    return lowerCount === 0;
}).map(entry => {
    const [key, value] = entry;

    // console.log(key);

    return Number(value);
}).reduce((acc, value) => acc + value + 1, 0);

console.log(localLows);