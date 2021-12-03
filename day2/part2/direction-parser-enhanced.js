const directionModifierMap = {
        back: (magnitude) => Math.abs(magnitude) * -1,
        forward: (magnitude) => Math.abs(magnitude),
        // forward: (magnitude, aim) => {
        //     const adjustedMagnitude = Math.abs(magnitude);

        //     return {
        //         x: adjustedMagnitude,
        //         y: adjustedMagnitude * aim
        //     };
        // },
        // back: (magnitude, aim) => {
        //     const adjustedMagnitude = Math.abs(magnitude) * -1;

        //     return {
        //         x: adjustedMagnitude,
        //         y: adjustedMagnitude * aim
        //     };
        // }
    },
    aimModifierMap = {
        up: (magnitude) => Math.abs(magnitude) * -1,
        down: (magnitude) => Math.abs(magnitude)
    };

function parseDirections(rawDirections) {
    return rawDirections.reduce((acc, rawDirection) => {
        const [
            direction,
            magnitude
        ] = rawDirection.split(' '),
        lcaseDirection = direction.toLowerCase();

        let updated = {
            ...acc
        };

        if (lcaseDirection === 'up' || lcaseDirection === 'down') {
            updated = {
                ...acc,
                aim: acc.aim + aimModifierMap[lcaseDirection](magnitude)
            }
        }

        if (lcaseDirection === 'forward' || lcaseDirection === 'back') {
            updated = {
                ...acc,
                x: acc.x + directionModifierMap[lcaseDirection](magnitude),
                y: acc.y + acc.aim * directionModifierMap[lcaseDirection](magnitude)
                // ...directionModifierMap[lcaseDirection](magnitude, acc.aim)
            }
        }

        return updated;
    }, {
        x: 0,
        y: 0,
        aim: 0
    })
}

// function parseDirection(rawDirection, aim = 0) {
//     const [
//         direction,
//         magnitude
//     ] = rawDirection.split(' '),
//     lcaseDirection = direction.toLowerCase(),
//     {
//         x,
//         y
//     } = 

//     return {
//         x: lcaseDirection === 'forward' || lcaseDirection === 'back' ? directionModifierMap[lcaseDirection](magnitude) : 0,
//         y: lcaseDirection === 'forward' || lcaseDirection === 'back' ? directionModifierMap[lcaseDirection](magnitude, aim) : 0
//         aim: 
//     };
// }

// function parseDirections(rawDirections) {
//     return rawDirections.map(parseDirection);
// }

// function sumDirectionVectors(directionVectors) {
//     return directionVectors.reduce((acc, directionVector) => {
//         const {
//                 x: accX,
//                 y: accY
//             } = acc,
//             {
//                 x: curX,
//                 y: curY
//             } = directionVector;
        
//         return {
//             x: accX + curX,
//             y: accY + curY
//         };
//     }, {
//         x: 0,
//         y: 0
//     });
// }

// function parseAndSumRawDirections(rawDirections) {
//     return sumDirectionVectors(parseDirections(rawDirections));
// }

// export {
//     parseAndSumRawDirections
// }

export {
    parseDirections
}