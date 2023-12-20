//const Frame = require('./Frame')
const BowlingGame = require("./BowlingGame");

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
  const rollPrompt = `Enter pins knocked down for frame ${
    game.currentFrame + 1
  }, roll ${rollNum}: `;
  readline.question(rollPrompt, (pins) => {
    game.roll(parseInt(pins, 10));
    askRoll();
  });
};

console.log("Bowling Game started!");
askRoll();
