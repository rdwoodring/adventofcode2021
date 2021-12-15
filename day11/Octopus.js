class Octopus {
    constructor(x, y, energy, flashCallback) {
        this.x = x;
        this.y = y;
        this.energy = Number(energy);
        this.flashCallback = flashCallback;
    }

    tick() {
        // this.energy += 1;

        // if (this.energy > 9) {
        //     this.flashCallback(this);
        // }

        this.boostEnergy();
    }

    boostEnergy() {
        const preBoostedEnergy = this.energy;

        this.energy += 1;

        if (preBoostedEnergy <= 9 && this.energy > 9) {
            this.flashCallback(this);
        }
    }
}

export default Octopus;