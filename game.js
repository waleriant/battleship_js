class Game {
	constructor() {
		this.player = new Player();
		this.computer = new Computer();
		this.log = "Place your ships.\n";
		this.shipsPlaced = false;
		this.gameOver = false;
	}
	
	addToLog(myStr) {
		this.log += myStr + "\n";
	}
	
	readLog() {
		return this.log;
	}

	getBattleshipToBePlaced() {
		return this.player.getBattleshipToBePlaced();
	}

	placeCurrent() {
		return this.player.placeCurrent();
	}

	moveLeftCurrent() {
		return this.player.moveLeftCurrent();
	}

	moveRightCurrent() {
		return this.player.moveRightCurrent();
	}

	moveDownCurrent() {
		return this.player.moveDownCurrent();
	}

	moveUpCurrent() {
		return this.player.moveUpCurrent();
	}

	rotateCurrent() {
		return this.player.rotateCurrent();
	}	

	getAllPlacedBattleships() {
		return this.player.getAllPlacedBattleships();
	}

	arePlayersReadyToPlay() {
		if (this.player.isReadyToPlay() && this.computer.isReadyToPlay()) {
			this.addToLog("All ships are placed now. Let's play!");
			return true;
		}
		return false;
	}

	updatePlayerTargetsHit(x, y) {
		return this.player.updateTargetsHit(x, y);
	}

	updatePlayerTargetsNoHit(x, y) {
		return this.player.updateTargetsNoHit(x, y);
	}

	updateComputerTargetsHit(x, y) {
		return this.computer.updateTargetsHit(x, y);
	}

	updateComputerTargetsNoHit(x, y) {
		return this.computer.updateTargetsNoHit(x, y);
	}

	recordPlayerAttack(x, y) {
		let result = this.computer.isFleetHit(x, y);
		if (result == "hit." || result == "sunk!") {
			this.updatePlayerTargetsHit(x, y);
		} else {
			this.updatePlayerTargetsNoHit(x, y);
		}
		this.addToLog("The player attacked (" + x + ", " + y + "): " + result);
	}

	recordComputerAttack() {
		let coords = this.computer.attack();
		let x = coords[0];
		let y = coords[1];
		let result = this.player.isFleetHit(x, y);
		if (result == "hit." || result == "sunk!") {
			this.updateComputerTargetsHit(x, y);
		} else {
			this.updateComputerTargetsNoHit(x, y);
		}
		this.addToLog("The computer attacked (" + x + ", " + y + "): " + result);
	}

	getPlayerArrayTickOrHit() {
		return this.player.getArrayTickOrHit();
	}

	isGameOver() {
		if (this.player.isDead()) {
			this.addToLog("The player won!");
			return true;
		} else if (this.computer.isDead()) {
			this.addToLog("The computer won!");
			return true;
		} else {
			return false;
		}
	}
}

