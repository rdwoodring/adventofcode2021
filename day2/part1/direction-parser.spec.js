import { expect } from '@jest/globals';
import {
    parseAndSumRawDirections
} from './direction-parser.js';

it('should correctly sum the vectors', () => {
    const data = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
        'down 8',
        'forward 2'
    ];

    const {
        x,
        y
    } = parseAndSumRawDirections(data);

    expect(x * y).toEqual(150);
});