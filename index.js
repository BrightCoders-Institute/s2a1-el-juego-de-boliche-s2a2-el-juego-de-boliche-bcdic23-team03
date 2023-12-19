const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});

class Frame {
    constructor() {
      this.rolls = [];
      this.bonus = 0;
    }
  
    addRoll(pins) {
      this.rolls.push(pins);
    }
  
    getScore() {
      return this.rolls.rezduce((a, b) => a + b, 0) + this.bonus;
    }
  
    isStrike() {
      return this.rolls[0] === 10;
    }
  
    isSpare() {
      return this.rolls.length === 2 && this.rolls[0] + this.rolls[1] === 10;
    }
  
    setBonus(bonus) {
      this.bonus += bonus;
    }
  
    isComplete() {
      return this.rolls.length === 2 || this.isStrike();
    }
}

class BowlingGame {
    constructor() {
      this.frames = Array.from({ length: 10 }, () => new Frame()); //Inicializamos el juego con la cantidad de 10 Frames
      this.currentFrameIndex = 0;
    }

    roll(pins) {
        const frame = this.frames[this.currentFrameIndex]; //aceder al frame actual
        
        frame.addRoll(pins);
        
        if (frame.isComplete() && this.currentFrameIndex < 9) {
          this.currentFrameIndex++;
        } else if (this.currentFrameIndex === 9) {
          if ((frame.isStrike() || frame.isSpare()) && frame.rolls.length < 3) {
            // Permitir un roll extra en el frame numero 10 si se hace strike o spare
          } else if (frame.rolls.length === 2) {
            this.currentFrameIndex++;
          }
        }
    
        this.calculateBonuses();
      }
}

function ingresarLosTiros(){
    
}
