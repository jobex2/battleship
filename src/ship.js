
const Ship = (name, startPosition, direction) => {
  let length = 0;
  switch (name) {
    case 'Carrier':
      length = 5;
      break
    case 'Battleship':
      length = 4;
      break
    case 'Destroyer':
      length = 3;
      break
    case 'Submarine':
      length = 3;
      break
    case 'Patrol Boat':
      length = 2;
  }

  let positions = [];
  for(let i = 0; i < length; i++){
    let position = {};
    if (direction === "across"){
      position = {
        x: startPosition[0] + i,
        y: startPosition[1],
        hit: false
      }
    }
    else if (direction === "down"){
      position = {
        x: startPosition[0],
        y: startPosition[1] + i,
        hit: false
      }
    }
    positions.push(position);
  }
  const hit = (location) => {
    let hit = false;
    positions.forEach(pos => {
      if (pos.x === location[0] && pos.y === location[1]){
        pos.hit = true;
        hit = true;
      }
    });
    return hit;
  }

  const isSunk = () => {
    let sunk = false;
    let hits = 0;
    positions.forEach(pos => {
      if (pos.hit === true){
        hits++
      }
      if(hits === length){
        sunk = true;
      }
    });
    return sunk;
  }

  const getCoordinates = () => positions;
  return { getCoordinates, hit, isSunk, name};
};

export default Ship;