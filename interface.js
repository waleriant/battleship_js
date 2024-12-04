const square = 50;
const border = 0.8;

const colorFillNothing = "white";

const colorBattleshipToBePlaced = "gray";
const colorBattleshipSunk = "red";
const colorBattleshipIntact = "limegreen";
const colorBattleshipHit = "orange";

const colorTarget = "gray";
const colorTargetHit = "red";
const colorTargetTick = "blue";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
/*
if (canvas.getContext) {
	const ctx = canvas.getContext("2d");
}
*/

game = new Game();

class Interface {
	constructor() {
		window.addEventListener('keyup', this.keyup);
		this.xTarget = 5;
		this.yTarget = 5;
	}

	drawPlayerField() {
		ctx.fillStyle = colorFillNothing;
		ctx.lineWidth = border; 
		for (let i = 0; i <= 9; i++) {
			for (let j = 0; j <= 9; j++) {
				ctx.beginPath();
				ctx.rect(i * square, j * square, square, square);
				ctx.stroke();
				ctx.fillRect(i * square + border, j * square + border, square - border, square - border)
			}
		}
		return true;
	}

	drawTargetsField() {
		ctx.fillStyle = colorFillNothing;
		ctx.lineWidth = border;
		for (let i = 12; i <= 21; i++) {
			for (let j = 0; j <= 9; j++) {
				ctx.beginPath();
				ctx.rect(i * square, j * square, square, square);
				ctx.stroke();
				ctx.fillRect(i * square + border, j * square + border, square - border, square - border)
			}
		}
		return true;
	}

	fillPlayerFieldSquare(x, y, color) {
		ctx.fillStyle = color;
		ctx.fillRect((x - 1) * square + border, (y - 1) * square + border, square -  border, square -  border);
		return true;
	}

	drawBattleship(battleship) {
		structure = battleship.getStructure();
		if (battleship.isPlaced() == false) {
			for (let i = 0; i < structure.length; i++) {
				this.fillPlayerFieldSquare(structure[i][0], structure[i][1], colorBattleshipToBePlaced);
			}
		} else {
			if (battleship.isSunk() == true) {
				for (let i = 0; i < structure.length; i++) {
					this.fillPlayerFieldSquare(structure[i][0], structure[i][1], colorBattleshipSunk);
				}
			} else {
				for (let i = 0; i < structure.length; i++) {
					if (structure[i][2] == true) {
						this.fillPlayerFieldSquare(structure[i][0], structure[i][1], colorBattleshipIntact);
					} else {
						this.fillPlayerFieldSquare(structure[i][0], structure[i][1], colorBattleshipHit);
					}
				}
			}
		}
	}

	fillTargetsFieldSquare(x, y, color) {
		ctx.fillStyle = color;
		ctx.fillRect((x - 1 + 12) * square + border, (y - 1) * square + border, square - border, square - border);
		return true;
	}

	drawCurrentTarget() {
		if (game.arePlayersReadyToPlay()) {
			this.fillTargetsFieldSquare(this.xTarget, this.yTarget, colorTarget);
			return true;
		}
		return false;
	}

	drawPastTargets() {
		for (const target of game.getPlayerArrayTickOrHit()) {
			if (target[2] == "x") {
				this.fillTargetsFieldSquare(target[0], target[1], colorTargetHit);
			} else {
				this.fillTargetsFieldSquare(target[0], target[1], colorTargetTick);
			}
		}
		return true;
	}

	drawAllPlacedBattleships() {
		let my_arrayBattleships = game.getAllPlacedBattleships()
		my_arrayBattleships.forEach((battleship) => this.drawBattleship(battleship));
		return true;
	}

	drawBattleshipToBePlaced() {
		if (!game.arePlayersReadyToPlay()) {
			return this.drawBattleship(game.getBattleshipToBePlaced());
		}
		return false;		
	}

	drawPlayerFleetStats() {
	}

	drawComputerFleetStats() {
	}

	drawLog() {
	}
	
	drawEverything() {
		this.drawPlayerField();
		this.drawTargetsField();

		this.drawAllPlacedBattleships();
		this.drawBattleshipToBePlaced();

		this.drawPastTargets();
		this.drawCurrentTarget();

		this.drawPlayerFleetStats();
		this.drawComputerFleetStats();
		this.drawLog();		
	}

	moveLeftTarget() {
		if (this.xTarget > 1) {
			this.xTarget--;
			return true;
		}
		return false;
	}

	moveRightTarget() {
		if (this.xTarget < 10) {
			this.xTarget++;
			return true;
		}
		return false;
	}

	moveDownTarget() {
		if (this.yTarget < 10) {
			this.yTarget++;
			return true;
		}
		return false;
	}

	moveUpTarget() {
		if (this.yTarget > 1) {
			this.yTarget--;
			return true;
		}
		return false;
	}

	keyup = (event) => {
		if (!game.arePlayersReadyToPlay()) {
			switch (event.code) {
				case "ArrowUp":
					game.moveUpCurrent();
					this.drawEverything();
					return true;
				case "ArrowDown":
					game.moveDownCurrent();
					this.drawEverything();
					return true;
				case "ArrowLeft":
					game.moveLeftCurrent();
					this.drawEverything();
					return true;
				case "ArrowRight":
					game.moveRightCurrent();
					this.drawEverything();
					return true;
				case "Space":
					game.rotateCurrent();
					this.drawEverything();
					return true;
				case "Enter":
					game.placeCurrent();
					this.drawEverything();
					return true;
			}
		} else {
			switch (event.code) {
				case "ArrowUp":
					this.moveUpTarget();
					this.drawEverything();
					return true;
				case "ArrowDown":
					this.moveDownTarget();
					this.drawEverything();
					return true;
				case "ArrowLeft":
					this.moveLeftTarget();
					this.drawEverything();
					return true;
				case "ArrowRight":
					this.moveRightTarget();
					this.drawEverything();
					return true;
				case "Enter":
					game.recordPlayerAttack(this.xTarget, this.yTarget);
					if (!game.isGameOver()) {
						game.recordComputerAttack();
					}
					return true;
			}
		}
	}
}

my_interface = new Interface();


// Setup

game.computer.placeAllRandomly();
my_interface.drawEverything()


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