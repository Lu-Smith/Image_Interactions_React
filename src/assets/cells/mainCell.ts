import mainEffect from "./mainEffect"

export default class mainCell {
    effect: mainEffect;
    x: number;
    y: number;

    constructor(mainEffect, x, y) {
        this.effect = mainEffect;
        this.x = x;
        this.y = y;
    }
}