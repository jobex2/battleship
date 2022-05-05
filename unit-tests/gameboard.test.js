import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test('correct placement', () => {
    let expected = Ship('Patrol Boat', [0,0], 'across');
    let gb = Gameboard();
    expect(JSON.stringify((gb.placeShip("Patrol Boat", [0,0], "across"))))
        .toStrictEqual(JSON.stringify(expected));
});

test('incorrect placement across', () => {
    let gb = Gameboard();
    expect(gb.placeShip("Patrol Boat", [9,0], "across")).toBe(undefined);
});

test('incorrect placement down', () => {
    let gb = Gameboard();
    expect(gb.placeShip("Destroyer", [4,8], "down")).toBe(undefined);
});

test('Overlap Placement', () => {
    let gb = Gameboard();
    gb.placeShip("Destroyer", [0,0], "down");
    gb.placeShip("Patrol Boat", [0,0], "down");
    expect(gb.placeShip("Patrol Boat", [0,0], "down")).toBe(undefined);
});

test('All Ships Sunk', () => {
    let gb = Gameboard();
    gb.placeShip("Destroyer", [0,0], "down");
    gb.placeShip("Patrol Boat", [1,0], "down");
    gb.receiveAttack([0,0]);
    gb.receiveAttack([0,1]);
    gb.receiveAttack([0,2]);
    gb.receiveAttack([1,0]);
    gb.receiveAttack([1,1]);
    expect(gb.allShipSunk()).toBe(true);
});