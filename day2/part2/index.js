import {
    parseDirections
} from './direction-parser-enhanced.js';

import {
    input
} from '../input.js';


const {
    x,
    y
} = parseDirections(input);

console.log(x * y);