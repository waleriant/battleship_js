const canvas = document.getElementById("myCanvas");
if (canvas.getContext) {
	const ctx = canvas.getContext("2d");
}

game = new Game();

class Interface {
	constructor() {
	}
	
	drawPlayerField() {

	}
	
	drawPlayerFleet(game) {
	}
	
	drawTargetsField(game) {
	}
	
	drawPlayerFleetStats(game) {
	}

	drawComputerFleetStats(game) {
	}

	drawLog(game) {
	}
	
	drawEverything(game) {
		this.drawPlayerField();
		this.drawPlayerFleet(game);
		this.drawTargetsField(game);
		this.drawPlayerFleetStats(game);
		this.drawComputerFleetStats(game);
		this.drawLog(game);		
	}
	
	inputPlayerPlacement(game) {
	
	}
	
	inputPlayerAttack(game) {
		
		return coords
	}
}  

my_interface = new Interface();


// Setup

game.computer.placeAllRandomly();


do {	
	playerShipPlaced = my_interface.inputPlayerPlacement(game);
	my_interface.drawEverything(game);
} while (!game.arePlayersReadyToPlay());

// Battle
/*

do {
	let coords = my_interface.inputPlayerAttack(game);
	game.recordPlayerAttack(coords[0], coords[1]);	
	my_interface.drawEverything(game);
		if (game.isGameOver()) break;
	
	game.recordComputerAttack(x, y);	
	my_interface.drawEverything(game);
} while (!game.isGameOver())

// Game Over

my_interface.drawEverything(game);
 */