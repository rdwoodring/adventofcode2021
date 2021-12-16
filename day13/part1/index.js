import {
    points,
    folds
} from '../input.js';

import Point from '../Point.js';

function stringifyPoint(point) {
    const {
        x,
        y
    } = point;

    return `${x},${y}`;
}

function doFold(foldInstruction, constructedPoints) {
    const {
            axis,
            coord
        } = foldInstruction;

    debugger;

    if (axis === 'y') {
        const pointsToReflect = constructedPoints.filter(point => point.y > coord),
            pointsSansPointsToReflect = constructedPoints.filter(point => !pointsToReflect.includes(point)),
            reflectedPoints = pointsToReflect.map(point => {
                const {
                    x,
                    y
                } = point,
                delta = y - coord;

                return new Point(x, coord - delta)
            }),
            dedupedPoints = Array.from(new Set([...pointsSansPointsToReflect, ...reflectedPoints].map(point => stringifyPoint(point))));
            
        return dedupedPoints.map(point => {
            const [
                x,
                y
            ] = point.split(',');

            return new Point(x, y);
        });
    } else {
        const pointsToReflect = constructedPoints.filter(point => point.x > coord),
            pointsSansPointsToReflect = constructedPoints.filter(point => !pointsToReflect.includes(point)),
            reflectedPoints = pointsToReflect.map(point => {
                const {
                    x,
                    y
                } = point,
                delta = x - coord;

                return new Point(coord - delta, y);
            }),
            dedupedPoints = Array.from(new Set([...pointsSansPointsToReflect, ...reflectedPoints].map(point => stringifyPoint(point))));
            
        return dedupedPoints.map(point => {
            const [
                x,
                y
            ] = point.split(',');

            return new Point(x, y);
        });
    }
}

const constructedPoints = points.map(point => {
        const [
            x,
            y
        ] = point.split(',');

        return new Point(x, y);
    }),
    pointMap = constructedPoints.reduce((acc, point) => {
        return {
            ...acc,
            [stringifyPoint(point)]: point
        }
    }, {}),
    foldInstructions = folds.map(fold => {
        const [
            axis,
            coord
        ] = fold.replace('fold along ', '')
            .split('=');

        return {
            axis,
            coord: Number(coord)
        }
    }),
    [firstInstruction] = foldInstructions,
    reflectedPoints = doFold(firstInstruction, constructedPoints);

console.log(reflectedPoints.length);