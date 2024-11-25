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
	
	arePlayersReadyToPlay() {
		if (this.player.isReadyToPlay() && this.computer.isReadyToPlay()) {
			this.addToLog("All ships are placed now. Let's play!");
			return true;
		}
		return false;
	}
	
	recordPlayerAttack(x, y) {
		this.addToLog("The player attacked (" + x + ", " + y + "): " + this.computer.isFleetHit(x, y));
	}

	recordComputerAttack(x, y) {
		this.addToLog("The computer attacked (" + x + ", " + y + "): " + this.player.isFleetHit(x, y));
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

