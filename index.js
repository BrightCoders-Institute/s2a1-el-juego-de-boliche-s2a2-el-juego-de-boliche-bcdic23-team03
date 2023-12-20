class Frame {
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

class BowlingGame {
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
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new BowlingGame();

const askRoll = () => {
  if (
    game.currentFrame > 9 ||
    (game.currentFrame === 9 && game.frames[9].isComplete())
  ) {
    console.log("Game completed!");
    console.log("Total Score:", game.getScore());
    readline.close();
    return;
  }

  const rollNum = game.frames[game.currentFrame].rolls.length + 1;
  const rollPrompt = `Enter pins knocked down for frame ${game.currentFrame + 1
    }, roll ${rollNum}: `;
  readline.question(rollPrompt, (pins) => {
    game.roll(parseInt(pins, 10));
    askRoll();
  });
};

console.log("Bowling Game started!");
askRoll();
