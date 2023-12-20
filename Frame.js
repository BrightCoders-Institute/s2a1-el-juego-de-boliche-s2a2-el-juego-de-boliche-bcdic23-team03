export default class Frame {
    constructor(isLast = false) {
        this.rolls = [];
        this.bonus = 0;
        this.isLast = isLast; // Añadimos una propiedad para identificar si es el último frame
    }

    addRoll(pins) {
        this.rolls.push(pins);
    }

    getScore() {
        return this.rolls.reduce((a, b) => a + b, 0) + this.bonus;
    }

    isStrike() {
        return this.rolls[0] === 10;
    }

    isSpare() {
        return (
            !this.isStrike() &&
            this.rolls.length === 2 &&
            this.rolls.reduce((a, b) => a + b, 0) === 10
        );
    }

    isComplete() {
        // El último frame es completo si se han hecho 3 tiros, o si después de dos tiros no se ha hecho ni strike ni spare
        if (this.isLast) {
            return (
                this.rolls.length === 3 ||
                (this.rolls.length === 2 && !this.isStrike() && !this.isSpare())
            );
        }
        // Los frames normales son completos si se ha hecho un strike o si hay dos tiros
        return this.isStrike() || this.rolls.length === 2;
    }
}
