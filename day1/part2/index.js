import {
    input
} from '../input.js';

// const input = [
//     199,
//     200,
//     208,
//     210,
//     200,
//     207,
//     240,
//     269,
//     260,
//     263
// ]

const slidingWindows = input.reduce((acc, current, idx, arr) => {
    
    if ((arr.len - 1) < idx + 2) {
        return acc;
    } else {
        // return acc + 1;
        const next = arr[idx + 1],
            nextNext = arr[idx + 2],
            sum = current + next + nextNext;

        return [...acc, sum];
    }

}, []),
increaseCount = slidingWindows.reduce((acc, current, idx, arr) => {
    if (idx === 0) {
        return acc;
    } else if (current > arr[idx - 1]) {
        return acc + 1;
    } else {
        return acc;
    }

}, 0);

console.log(increaseCount);