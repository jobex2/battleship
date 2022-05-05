const Player = (name) => {
  const attack = (coordinates) => {
      return coordinates;
  }
  return {attack};
}

const Computer = () => {
  let coordsHit = [];

  const randomAttack = () => {
    let count = coordsHit.length;
    let coords = [];
    let found = true;
    while(found){
      if(count > 100){
        break
      }
      coords[0] = Math.floor(Math.random() * 10);
      coords[1] = Math.floor(Math.random() * 10);
      if(coordsHit.length === 0){
        found = false;
        coordsHit.push(coords);
      }
      coordsHit.forEach(coordHit => {
        if(coordHit[0] != coords[0] && coordHit[1] != coords[1]){
          found = false;
          coordsHit.push(coords);
        }
      });
      count++;
    }
    return coords;
  }
  return {randomAttack}
}

export {Player, Computer};