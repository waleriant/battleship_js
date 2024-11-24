class Player {
	constructor() {
		this.targets = new Targets();
		this.arrayBattleships = new Array();
		
		let battleship1 = new Battleship(5, 5, 5, 9);
		this.arrayBattleships.push(battleship1);
		
		let battleship2 = new Battleship(5, 5, 5, 8);
		this.arrayBattleships.push(battleship2);

		let battleship3 = new Battleship(5, 5, 5, 7);
		this.arrayBattleships.push(battleship3);

		let battleship4 = new Battleship(5, 5, 5, 7);
		this.arrayBattleships.push(battleship4);

		let battleship5 = new Battleship(5, 5, 5, 6);	
		this.arrayBattleships.push(battleship5);
	}
	
	getBattleshipByNb(nb) {
		if (nb >= 1 && nb <= 5) {
			return this.arrayBattleships[nb-1];
		} else {
			return [];
		}
	}
	// --------------------------------------------------------------------------------------------------
	// ----------------------------------------- SET UP METHODS -----------------------------------------
	// --------------------------------------------------------------------------------------------------
	
	// returns the number of the battleship to be placed (1, 2, 3, 4, 5)
	// returns 0 if there is no more battleship to place
	
	nbOfBattleshipToBePlaced() {
		for (let i = 1; i <= 5; i++) {
			if (this.getBattleshipByNb(i).isPlaced() == false) {
				return i;
			}
		}
		return 0;
	}
	
	getBattleshipToBePlaced() {
		return this.getBattleshipByNb(this.nbOfBattleshipToBePlaced());
	}
	
	isReadyToPlay() {
		return (this.nbOfBattleshipToBePlaced()==0);
	}
	
	// the following functions move and rotate the battleship to be placed
	
	moveLeftCurrent() {
		if (this.isReadyToPlay() == false) {
			return this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].moveLeft();
		}
		return false;
	}
		
	moveRightCurrent() {
		if (this.isReadyToPlay() == false) {
			return this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].moveRight();
		}
		return false;
	}
	
	moveDownCurrent() {
		if (this.isReadyToPlay() == false) {
			return this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].moveDown();
		}
		return false;
	}	
	
	moveUpCurrent() {
		if (this.isReadyToPlay() == false) {
			return this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].moveUp();
		}
		return false;
	}
	
	rotateCurrent() {
		if (this.isReadyToPlay() == false) {
			return this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].rotate();
		}
		return false;
	}	
	
	// checks that there is no overlap with the previous battleships of arrayBattleships
	
	currentCanBePlaced() {
		let nb = this.nbOfBattleshipToBePlaced();
		for (let i = 1; i < nb; i++) {
			if (checkIfBattleshipsOverlap(this.getBattleshipByNb(i), this.getBattleshipByNb(nb)).length != 0) {
				return false;
			}
		}
		return true;
	}
	
	placeCurrent() {
		if (this.currentCanBePlaced()) {
			this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].place();
			return true;
		}
		return false;
	}

	// --------------------------------------------------------------------------------------------------
	// ----------------------------- IN-GAME METHODS RELATED TO ENEMY FIRE ------------------------------
	// --------------------------------------------------------------------------------------------------

	// returns [bool1, bool2, bool3, bool4, bool5]
	// where boolx == true if the battleship x is still OK
	
	fleetStats() {
		let myArr = new Array();
		for (const battleship of this.arrayBattleships) {
			myArr.push(!(battleship.isSunk()));
		}
		return myArr;
	}
	
	isFleetHit(x, y) {
		for (const battleship of this.arrayBattleships) {
			let msg = battleship.isHit(x, y);
			if (msg != "Nothing.") {
				 return msg;
			}
		}
		return "Nothing.";
	}
	
	isDead() {
		for (const battleship of this.arrayBattleships) {
			if (battleship.isSunk() == false) {
				return false;
			}			
		}
		return true;
	}
	
	// --------------------------------------------------------------------------------------------------
	// ------------------------------ IN-GAME METHODS RELATED TO OWN FIRE -------------------------------
	// --------------------------------------------------------------------------------------------------

	// checks if the player already attacked (x, y)
	
	isAttackPossible(x, y) {
		return (x <= 10 && x >= 1 && y <= 10 && y >= 1 && this.targets.check(x, y) == "_")
	}

	// updates the targets
	
	updateTargetsHit(x, y) {
		if (this.targets.check(x, y) != "_") {
			return false;
		} else {
			this.targets.hit(x, y);
			return true;
		}
	}
	
	updateTargetsNoHit(x, y) {
		if (this.targets.check(x, y) != "_") {
			return false;
		} else {
			this.targets.tick(x, y);
			return true;
		}
	}
}

// --------------------------------------------------------------------------------------------------
// ---------------------------------------- COMPUTER LOGIC ------------------------------------------
// --------------------------------------------------------------------------------------------------

// returns an integer between 1 and max

function getRandomIndex(max) {
  return Math.floor(Math.random() * max) + 1;
}

class Computer extends Player {
	constructor() {
		super();
	}
	
	replaceStructureCurrentBattleship(structure) {
		this.arrayBattleships[this.nbOfBattleshipToBePlaced()-1].assignStructure(structure);
	}
	
	placeCurrentRandomly() {
		if (this.isReadyToPlay()) {
			return false;
		}
		do {
			let my_length = this.getBattleshipToBePlaced().length();
			let x1;
			let y1;
			let x2;
			let y2;
			if (getRandomIndex(2) == 1) {
				x1 = getRandomIndex(10 - my_length);
				x2 = x1 + my_length - 1;
				y1 = getRandomIndex(10);
				y2 = y1;				
			} else {
				y1 = getRandomIndex(10 - my_length);
				y2 = y1 + my_length - 1;
				x1 = getRandomIndex(10);
				x2 = x1;							
			}
			let new_structure = buildBattleshipStructure(x1, y1, x2, y2);
			this.replaceStructureCurrentBattleship(new_structure);
		} while (!this.currentCanBePlaced()) 
		this.placeCurrent();
		return true;
	}
	
	attack() {
		let x;
		let y;
		do {
			x = getRandomIndex(10);
			y = getRandomIndex(10);
		} while (this.targets.check(x, y) != "_");
		let couple = [x, y];
		return couple;
	}
}