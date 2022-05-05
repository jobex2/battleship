import {Player, Computer} from "../src/player";

test('Player Attack', () => {
    let player = Player("Joe");
    expect(JSON.stringify(player.attack([0,0]))).toBe(JSON.stringify([0,0]));
});

test('Comuter Attack', () => {
    let computer = Computer();
    expect(JSON.stringify(computer.randomAttack())).toBe();
});