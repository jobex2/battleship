/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


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
		let newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(type, location, rotation)
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
					let ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(type, location, rotation)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Computer": () => (/* binding */ Computer),
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
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



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");




let player = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)("Josh");
let computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Computer)();

let playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
let computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixpREFBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ3pGeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUNwRW5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ007OztBQUcxQyxhQUFhLCtDQUFNO0FBQ25CLGVBQWUsaURBQVE7O0FBRXZCLGtCQUFrQixzREFBUztBQUMzQixvQkFBb0Isc0RBQVM7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIlxuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG5cdGxldCBzaGlwcyA9IFtdO1xuXHRsZXQgZ2FtZWJvYXJkSGl0cyA9IFtdO1xuXG5cdGNvbnN0IGNvcnJlY3RCb2FyZFBsYWNlbWVudCA9ICh0eXBlLCBsb2NhdGlvbiwgcm90YXRpb24pID0+IHtcblx0XHRsZXQgbGVuZ3RoID0gMDtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRjYXNlICdDYXJyaWVyJzpcblx0XHRcdGxlbmd0aCA9IDU7XG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ0JhdHRsZXNoaXAnOlxuXHRcdFx0bGVuZ3RoID0gNDtcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnRGVzdHJveWVyJzpcblx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ1N1Ym1hcmluZSc6XG5cdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdQYXRyb2wgQm9hdCc6XG5cdFx0XHRsZW5ndGggPSAyO1xuXHRcdH1cblx0XHRpZihyb3RhdGlvbiA9PT0gXCJkb3duXCIgJiYgbG9jYXRpb25bMV0gPj0gMTAgLSAobGVuZ3RoIC0gMSkpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRlbHNlIGlmKHJvdGF0aW9uID09PSBcImFjcm9zc1wiICYmIGxvY2F0aW9uWzBdID49IDEwIC0gKGxlbmd0aCAtIDEpKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBub1NoaXBPdmVybGFwID0gKHR5cGUsIGxvY2F0aW9uLCByb3RhdGlvbikgPT4ge1xuXHRcdGxldCBuZXdTaGlwID0gU2hpcCh0eXBlLCBsb2NhdGlvbiwgcm90YXRpb24pXG5cdFx0bGV0IG5vT3ZlcmxhcCA9IHRydWU7XG5cdFx0bGV0IG5ld0Nvb3JzID0gbmV3U2hpcC5nZXRDb29yZGluYXRlcygpO1xuXHRcdHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG5cdFx0XHRsZXQgY29vcnMgPSBzaGlwLmdldENvb3JkaW5hdGVzKCk7XG5cdFx0XHRjb29ycy5mb3JFYWNoKGNvb3IgPT4ge1xuXHRcdFx0XHRuZXdDb29ycy5mb3JFYWNoKG5ld0Nvb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChjb29yLnggPT0gbmV3Q29vci54ICYmIGNvb3IueSA9PSBuZXdDb29yLnkpe1xuXHRcdFx0XHRcdFx0bm9PdmVybGFwID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiBub092ZXJsYXA7XG5cdH1cblxuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh0eXBlLCBsb2NhdGlvbiwgcm90YXRpb24pID0+IHtcblx0XHRpZihjb3JyZWN0Qm9hcmRQbGFjZW1lbnQodHlwZSwgbG9jYXRpb24sIHJvdGF0aW9uKSBcblx0XHRcdFx0JiYgKG5vU2hpcE92ZXJsYXAodHlwZSwgbG9jYXRpb24sIHJvdGF0aW9uKSkpe1xuXHRcdFx0XHRcdGxldCBzaGlwID0gU2hpcCh0eXBlLCBsb2NhdGlvbiwgcm90YXRpb24pXG5cdFx0XHRcdFx0c2hpcHMucHVzaChzaGlwKTtcblx0XHRcdFx0XHRyZXR1cm4gc2hpcDtcblx0XHRcdFx0fVxuXHR9XG5cblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChsb2NhdGlvbikgPT4ge1xuXHRcdGxldCB3YXNIaXQgPSBmYWxzZTtcblx0XHRzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuXHRcdFx0d2FzSGl0ID0gc2hpcC5oaXQobG9jYXRpb24pO1xuXHRcdH0pO1xuXHRcdGlmICghd2FzSGl0KXtcblx0XHRcdGdhbWVib2FyZEhpdHMucHVzaChsb2NhdGlvbik7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYWxsU2hpcFN1bmsgPSAoKSA9PiB7XG5cdFx0bGV0IG51bWJlck9mU2hpcHM9IHNoaXBzLmxlbmd0aDtcblx0XHRsZXQgU2hpcHNTdW5rID0gMDtcblx0XHRzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuXHRcdFx0aWYoc2hpcC5pc1N1bmsoKSl7XG5cdFx0XHRcdFNoaXBzU3VuaysrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlmKCBudW1iZXJPZlNoaXBzID09IFNoaXBzU3Vuayl7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdFxuXHRyZXR1cm4geyBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBTdW5rLCBzaGlwc307XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuICByZXR1cm4ge2F0dGFja307XG59XG5cbmNvbnN0IENvbXB1dGVyID0gKCkgPT4ge1xuICBsZXQgY29vcmRzSGl0ID0gW107XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IGNvb3Jkc0hpdC5sZW5ndGg7XG4gICAgbGV0IGNvb3JkcyA9IFtdO1xuICAgIGxldCBmb3VuZCA9IHRydWU7XG4gICAgd2hpbGUoZm91bmQpe1xuICAgICAgaWYoY291bnQgPiAxMDApe1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY29vcmRzWzBdID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29vcmRzWzFdID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYoY29vcmRzSGl0Lmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGNvb3Jkc0hpdC5wdXNoKGNvb3Jkcyk7XG4gICAgICB9XG4gICAgICBjb29yZHNIaXQuZm9yRWFjaChjb29yZEhpdCA9PiB7XG4gICAgICAgIGlmKGNvb3JkSGl0WzBdICE9IGNvb3Jkc1swXSAmJiBjb29yZEhpdFsxXSAhPSBjb29yZHNbMV0pe1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgY29vcmRzSGl0LnB1c2goY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG4gIHJldHVybiB7cmFuZG9tQXR0YWNrfVxufVxuXG5leHBvcnQge1BsYXllciwgQ29tcHV0ZXJ9OyIsIlxuY29uc3QgU2hpcCA9IChuYW1lLCBzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24pID0+IHtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ0NhcnJpZXInOlxuICAgICAgbGVuZ3RoID0gNTtcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmF0dGxlc2hpcCc6XG4gICAgICBsZW5ndGggPSA0O1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdEZXN0cm95ZXInOlxuICAgICAgbGVuZ3RoID0gMztcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnU3VibWFyaW5lJzpcbiAgICAgIGxlbmd0aCA9IDM7XG4gICAgICBicmVha1xuICAgIGNhc2UgJ1BhdHJvbCBCb2F0JzpcbiAgICAgIGxlbmd0aCA9IDI7XG4gIH1cblxuICBsZXQgcG9zaXRpb25zID0gW107XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgbGV0IHBvc2l0aW9uID0ge307XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJhY3Jvc3NcIil7XG4gICAgICBwb3NpdGlvbiA9IHtcbiAgICAgICAgeDogc3RhcnRQb3NpdGlvblswXSArIGksXG4gICAgICAgIHk6IHN0YXJ0UG9zaXRpb25bMV0sXG4gICAgICAgIGhpdDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImRvd25cIil7XG4gICAgICBwb3NpdGlvbiA9IHtcbiAgICAgICAgeDogc3RhcnRQb3NpdGlvblswXSxcbiAgICAgICAgeTogc3RhcnRQb3NpdGlvblsxXSArIGksXG4gICAgICAgIGhpdDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICB9XG4gIGNvbnN0IGhpdCA9IChsb2NhdGlvbikgPT4ge1xuICAgIGxldCBoaXQgPSBmYWxzZTtcbiAgICBwb3NpdGlvbnMuZm9yRWFjaChwb3MgPT4ge1xuICAgICAgaWYgKHBvcy54ID09PSBsb2NhdGlvblswXSAmJiBwb3MueSA9PT0gbG9jYXRpb25bMV0pe1xuICAgICAgICBwb3MuaGl0ID0gdHJ1ZTtcbiAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaGl0O1xuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdW5rID0gZmFsc2U7XG4gICAgbGV0IGhpdHMgPSAwO1xuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvcyA9PiB7XG4gICAgICBpZiAocG9zLmhpdCA9PT0gdHJ1ZSl7XG4gICAgICAgIGhpdHMrK1xuICAgICAgfVxuICAgICAgaWYoaGl0cyA9PT0gbGVuZ3RoKXtcbiAgICAgICAgc3VuayA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZGluYXRlcyA9ICgpID0+IHBvc2l0aW9ucztcbiAgcmV0dXJuIHsgZ2V0Q29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBuYW1lfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHtDb21wdXRlciwgUGxheWVyfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuXG5sZXQgcGxheWVyID0gUGxheWVyKFwiSm9zaFwiKTtcbmxldCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG5cbmxldCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xubGV0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcblxucGxheWVyQm9hcmQucGxhY2VTaGlwKFwiQ2FycmllclwiLCBbMCwwXSwgJ2Rvd24nKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcChcIkJhdHRsZXNoaXBcIiwgWzEsMF0sICdkb3duJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXCJEZXN0cm95ZXJcIiwgWzIsMF0sICdkb3duJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXCJTdWJtYXJpbmVcIiwgWzMsMF0sICdkb3duJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXCJQYXRyb2wgQm9hdFwiLCBbNCwwXSwgJ2Rvd24nKTtcblxuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoXCJDYXJyaWVyXCIsIFswLDBdLCAnZG93bicpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoXCJCYXR0bGVzaGlwXCIsIFsxLDBdLCAnZG93bicpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoXCJEZXN0cm95ZXJcIiwgWzIsMF0sICdkb3duJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcChcIlN1Ym1hcmluZVwiLCBbMywwXSwgJ2Rvd24nKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFwiUGF0cm9sIEJvYXRcIiwgWzQsMF0sICdkb3duJyk7XG5cblxud2hpbGUoIXBsYXllckJvYXJkLmFsbFNoaXBTdW5rKCkgfHwgIWNvbXB1dGVyQm9hcmQuYWxsU2hpcFN1bmsoKSl7XG4gICAgY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHBsYXllci5hdHRhY2soWzAsMF0pKTtcbiAgICBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvbXB1dGVyLnJhbmRvbUF0dGFjaygpKTtcblxufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=