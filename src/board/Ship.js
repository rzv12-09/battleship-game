export default class Ship {
    constructor(length){
        this.id = crypto.randomUUID();
        this.length = length;
        this.hitsReceived = 0;
    }

    hit() {
        this.hitsReceived++;
    }

    isSunk() {
        return this.hitsReceived === this.length;
    }
}