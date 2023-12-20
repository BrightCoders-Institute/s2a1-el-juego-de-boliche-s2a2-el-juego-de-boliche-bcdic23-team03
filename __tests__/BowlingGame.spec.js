const BowlingGame = require("../BowlingGame");

describe("BowlingGame", () => {
  test("Should start a game", () => {});
});

describe("BowlingGame class", () => {
  let game;

  beforeEach(() => {
    game = new BowlingGame();
  });
  test("should correctly roll and update score", () => {
    game.roll(5);
    game.roll(4);
    expect(game.getScore()).toBe(9);
  });
  test("should handle a strike correctly", () => {
    game.roll(10);
    game.roll(3);
    game.roll(4);
    expect(game.getScore()).toBe(37);
  });
  test("should handle a spare correctly", () => {
    game.roll(7);
    game.roll(3); // Spare
    game.roll(5);
    expect(game.getScore()).toBe(23);
  });
});
