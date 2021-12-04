import {
    parseBinaryStrings,
    reverseBits
} from './bit-parser.js';

import {
    input
} from '../input.js'

const gamma = parseBinaryStrings(input),
    epsilon = reverseBits(gamma),
    gammaDecimal = parseInt(gamma, 2),
    epsilonDecimal = parseInt(epsilon, 2);

console.log(gammaDecimal * epsilonDecimal);