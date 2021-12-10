import {
    input
} from '../input.js';

const outputValues = input.split('\n').map((splitInputs) => splitInputs.split('|').pop()).map((str) => str.trim());

const oneFourSevenEightCount = outputValues.reduce((acc, valueStrings) => {
    return acc + valueStrings.split(' ').filter(valueString => valueString.length === 2 || 
        valueString.length === 3 ||
        valueString.length === 4 ||
        valueString.length === 7).length
}, 0);

console.log(oneFourSevenEightCount);