// import {
//     input
// } from '../tempInput.js';

import {
    input
} from '../input.js';

import LanternFish from '../LanternFish.js';

let lanternFish = input.map((age) => new LanternFish(spawnNewLanternFish, age));

function spawnNewLanternFish() {
    lanternFish.push(new LanternFish(spawnNewLanternFish));
}

for (let i = 0; i < 80; i++) {
    lanternFish.forEach(fish => fish.tick());
}

console.log(lanternFish.length);