import {
    getCarbonDioxideBits,
    getOxygenBits
} from './bit-parser.js';

import {
    input
} from '../input.js'

function recursiveFilterReadings(readings, bits, idx, bitFn) {
    const filteredReadings = readings.filter(item => item[idx] === bits[idx]);

    if (filteredReadings.length === 1) {
        return filteredReadings[0];
    } else {
        return recursiveFilterReadings(filteredReadings, bitFn(filteredReadings), idx + 1, bitFn)
    }
}

const oxygenReading = recursiveFilterReadings(input, getOxygenBits(input), 0, getOxygenBits),
    carbonDioxideReading = recursiveFilterReadings(input, getCarbonDioxideBits(input), 0, getCarbonDioxideBits),
    oxygenReadingDecimal = parseInt(oxygenReading, 2),
    carbonDioxideDecimal = parseInt(carbonDioxideReading, 2);

console.log(oxygenReadingDecimal * carbonDioxideDecimal)