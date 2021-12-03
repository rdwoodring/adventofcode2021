import {
    parseAndSumRawDirections
} from './direction-parser.js';

import {
    input
} from '../input.js'

const {
    x,
    y
} = parseAndSumRawDirections(input);

console.log(x * y);