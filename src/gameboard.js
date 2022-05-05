import Ship from "./ship"

const Gameboard = () => {
	let ships = [];
	let gameboardHits = [];

	const correctBoardPlacement = (type, location, rotation) => {
		let length = 0;
		switch (type) {
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
		if(rotation === "down" && location[1] >= 10 - (length - 1)){
			return false;
		}
		else if(rotation === "across" && location[0] >= 10 - (length - 1)){
			return false;
		}
		else {
			return true;
		}
	}

	const noShipOverlap = (type, location, rotation) => {
		let newShip = Ship(type, location, rotation)
		let noOverlap = true;
		let newCoors = newShip.getCoordinates();
		ships.forEach(ship => {
			let coors = ship.getCoordinates();
			coors.forEach(coor => {
				newCoors.forEach(newCoor => {
					if (coor.x == newCoor.x && coor.y == newCoor.y){
						noOverlap = false;
					}
				});
			});
		});
		return noOverlap;
	}


	const placeShip = (type, location, rotation) => {
		if(correctBoardPlacement(type, location, rotation) 
				&& (noShipOverlap(type, location, rotation))){
					let ship = Ship(type, location, rotation)
					ships.push(ship);
					return ship;
				}
	}

	const receiveAttack = (location) => {
		let wasHit = false;
		ships.forEach(ship => {
			wasHit = ship.hit(location);
		});
		if (!wasHit){
			gameboardHits.push(location);
		}
	}

	const allShipSunk = () => {
		let numberOfShips= ships.length;
		let ShipsSunk = 0;
		ships.forEach(ship => {
			if(ship.isSunk()){
				ShipsSunk++;
			}
		});
		if( numberOfShips == ShipsSunk){
			return true;
		}
		return false;
	}
	
	return { placeShip, receiveAttack, allShipSunk, ships};
}

export default Gameboard;