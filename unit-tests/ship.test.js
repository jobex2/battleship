import Ship from "../src/ship";

test('Correct Name', () => {
    let ship = Ship('Submarine', null, null)
    expect(ship.name).toBe('Submarine');
});

test('Ship Coordinates', () => {
    let ship = Ship('Patrol Boat', [0,0], 'across')
    let expected = [
        {x:0, y:0, hit:false},
        {x:1, y:0, hit:false},
    ]
    expect(JSON.stringify(ship.getCoordinates())).toBe(JSON.stringify(expected));
});

test('Is hit', () => {
    let ship = Ship('Submarine', [0,0], 'down')
    expect(ship.hit([0,2])).toBe(true);
});

test('Is sunk', () => {
    let ship = Ship('Carrier', [0,0], 'down')
    ship.hit([0,0]);
    ship.hit([0,1]);
    ship.hit([0,2]);
    ship.hit([0,3]);
    ship.hit([0,4]);
    expect(ship.isSunk()).toBe(true);
});