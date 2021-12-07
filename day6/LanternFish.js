class LanternFish {
    constructor(spawnNewLanternFish, initialCounter = 8) {
        this.spawnNewLanternFish = spawnNewLanternFish;
        this.counter = initialCounter;
    }

    tick() {
        if (this.counter - 1 < 0) {
            this.spawnNewLanternFish();
            this.counter = 6
        } else {
            this.counter -= 1;
        }
    }
}

export default LanternFish;