import Gameboard from "./gameboard";
import {Computer, Player} from "./player";


let player = Player("Josh");
let computer = Computer();

let playerBoard = Gameboard();
let computerBoard = Gameboard();

playerBoard.placeShip("Carrier", [0,0], 'down');
playerBoard.placeShip("Battleship", [1,0], 'down');
playerBoard.placeShip("Destroyer", [2,0], 'down');
playerBoard.placeShip("Submarine", [3,0], 'down');
playerBoard.placeShip("Patrol Boat", [4,0], 'down');

computerBoard.placeShip("Carrier", [0,0], 'down');
computerBoard.placeShip("Battleship", [1,0], 'down');
computerBoard.placeShip("Destroyer", [2,0], 'down');
computerBoard.placeShip("Submarine", [3,0], 'down');
computerBoard.placeShip("Patrol Boat", [4,0], 'down');


while(!playerBoard.allShipSunk() || !computerBoard.allShipSunk()){
    computerBoard.receiveAttack(player.attack([0,0]));
    playerBoard.receiveAttack(computer.randomAttack());

}

