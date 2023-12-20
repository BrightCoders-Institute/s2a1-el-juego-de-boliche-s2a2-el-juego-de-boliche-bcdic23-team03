const Frame = require("../Frame");

describe("Frame class", () => {
  test("should handle a strike", () => {
    const frame = new Frame();
    frame.addRoll(10);
    expect(frame.isStrike()).toBe(true);
  });
  test("should handle a spare", () => {
    const frame = new Frame()
    frame.addRoll(7)
    frame.addRoll(3)
    expect(frame.isSpare()).toBe(true)
  });
  test("should calculate score correctly", () => {
    const frame = new Frame();
    frame.addRoll(5);
    frame.addRoll(4);
    expect(frame.getScore()).toBe(9);
  });
});
