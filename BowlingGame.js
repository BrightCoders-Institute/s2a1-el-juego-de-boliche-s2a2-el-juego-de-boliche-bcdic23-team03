export default class BowlingGame {
    constructor() {
        this.frames = Array.from({ length: 9 }, () => new Frame()).concat(
            new Frame(true),
        );
        this.currentFrame = 0;
    }

    roll(pins) {
        const frame = this.frames[this.currentFrame];
        frame.addRoll(pins);

        if (frame.isLast) {
            if (frame.isComplete()) {
                this.currentFrame++;
            }
        } else if (frame.isComplete()) {
            this.currentFrame++;
        }

        this.applyBonuses(pins);
    }

    applyBonuses(pins) {
        // Aplicar bonificaciones para strikes y spares
        this.frames.forEach((frame, index) => {
            if (frame.isStrike() && index < 9) {
                if (index === this.currentFrame - 1) {
                    frame.bonus += pins; // Agregar bono inmediato para un strike
                } else if (this.frames[index + 1].isStrike() && index < 8) {
                    frame.bonus += this.frames[index + 1].rolls[0]; // Agregar bono para dos strikes seguidos
                    if (this.frames[index + 2].rolls.length > 0) {
                        frame.bonus += this.frames[index + 2].rolls[0]; // Agregar bono del siguiente frame si ya se lanzó
                    }
                } else if (this.frames[index + 1].rolls.length > 1) {
                    frame.bonus +=
                        this.frames[index + 1].rolls[0] + this.frames[index + 1].rolls[1]; // Sumar los siguientes dos tiros para un strike
                }
            } else if (frame.isSpare() && index < 9) {
                if (index === this.currentFrame - 1) {
                    frame.bonus += pins; // Agregar bono inmediato para un spare
                }
            }
        });
    }

    getScore() {
        let totalScore = 0;
        for (let i = 0; i < 10; i++) {
            totalScore += this.frames[i].getScore();
            if (i === 9 && (this.frames[i].isStrike() || this.frames[i].isSpare())) {
                totalScore += this.frames[i].rolls[2] || 0; // Asegurarse de agregar el tercer tiro si existe en el último frame
            }
        }
        return totalScore;
    }
}
