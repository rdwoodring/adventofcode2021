import {
    input
} from '../input.js';

let fishAgeMap = input.reduce((acc, fish) => {
    return {
        ...acc,
        [fish]: acc[fish] ? acc[fish] + 1 : 1
    }
}, {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
});

console.log(fishAgeMap);

for (let i = 0; i < 256; i++) {
    const prevZero = fishAgeMap[0];

    console.log(`Day ${i + 1} of 256`);

    fishAgeMap = Object.entries(fishAgeMap).reduce((acc, fishAgeBucket) => {
        const [key, value] = fishAgeBucket;

        if (Number(key) === 0 ) {
            return acc;
        } else if (Number(key) === 8) {
            return {
                ...acc,
                [Number(key) - 1]: value,
                [8]: prevZero
            }
        } else {
            return {
                ...acc,
                [Number(key) - 1]: value
            }
        }
    }, {})

    fishAgeMap[6] += prevZero;
}

console.log(Object.values(fishAgeMap).reduce((acc, val) => acc + val, 0));