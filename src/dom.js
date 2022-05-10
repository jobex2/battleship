const Dom = () => {
    const createGrid = (player) =>{
        const container = document.getElementById(player);
        let counter = 0;
        for(let k = 0; k < 10; k++){
            for(let j = 0; j < 100; j+=10){
                let grid = document.createElement('div');
                grid.classList.add('square'+'-'+player);
                counter = j+k;
                grid.setAttribute("data-coor",counter);
                container.append(grid);
            }
        }
    }
    
    const displayShips = (board, player) =>{
        let squares = document.querySelectorAll('.square' + '-' + player + '-board');
        let ships = board.ships;
        ships.forEach(ship => {
            let coors = ship.getCoordinates()
            coors.forEach(coor => {
                let coord = (coor.x*10) + coor.y;
                squares.forEach(square => {
                    if(square.dataset.coor == coord){
                        square.classList.add('ship');
                    }
                });
            });
    
        });
    }

    const eventListeners = (player, name) => {
        let squares = document.querySelectorAll('.square' + '-' + name + '-board');
        squares.forEach(square => {
            square.addEventListener('click', () => {
                let x = Math.trunc(square.dataset.coor/10);
                let y = square.dataset.coor - (x*10);
                let coords = [x,y];
                player.attack(coords);
            });
        });
    }

    const hitOrMiss = (ships, square) => {
        ships.forEach(ship => {
            let coors = ship.getCoordinates()
            coors.forEach(coor => {
                let coord = (coor.x*10) + coor.y;
                if(coord == square.dataset.coor){
                    square.classList.add('hit');
                    coor.hit = true;
                }
                else{
                    square.classList.add('miss');
                }
            });
    
        });
    }

    return {createGrid, displayShips, eventListeners}
}

export default Dom;
