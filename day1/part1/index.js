import {
    input
} from '../input.js';

const increaseCount = input.reduce((acc, current, idx, arr) => {
    if (idx === 0) {
        return acc;
    } else if (current > arr[idx - 1]) {
        return acc + 1;
    } else {
        return acc;
    }

}, 0);

console.log(increaseCount);