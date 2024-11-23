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
	
	// returns the number of the battleship to be placed (1, 2, 3, 4, 5)
	// returns 0 if there is no more battleship to place
	
	nbCurrentBattleship() {
		for (let i = 0; i < 5; i++) {
			if (this.arrayBattleships[i].fixed == false) {
				let nb = i + 1;
				return nb;
			}
		}
		return 0;
	}
	
	getCurrentStructure() {
		return this.arrayBattleships[this.nbCurrentBattleship()-1].structure
	}
	
	readyToPlay() {
		return (this.nbCurrentBattleship()==0);
	}
	
	// the following functions move and rotate the battleship to be placed
	
	moveLeftCurrent() {
		if (this.readyToPlay() == false) {
			return this.arrayBattleships[this.nbCurrentBattleship()-1].moveLeft();
		}
		return false;
	}
		
	moveRightCurrent() {
		if (this.readyToPlay() == false) {
			return this.arrayBattleships[this.nbCurrentBattleship()-1].moveRight();
		}
		return false;
	}
	
	moveDownCurrent() {
		if (this.readyToPlay() == false) {
			return this.arrayBattleships[this.nbCurrentBattleship()-1].moveDown();
		}
		return false;
	}	
	
	moveUpCurrent() {
		if (this.readyToPlay() == false) {
			return this.arrayBattleships[this.nbCurrentBattleship()-1].moveUp();
		}
		return false;
	}
	
	rotateCurrent() {
		if (this.readyToPlay() == false) {
			return this.arrayBattleships[this.nbCurrentBattleship()-1].rotate();
		}
		return false;
	}	
	
	// checks that there is no overlap with the previous battleships of arrayBattleships
	
	currentCanBeFixed() {
		let nb = this.nbCurrentBattleship();
		for (let i = 0; i < nb-1; i++) {
			if (checkOverlap(this.arrayBattleships[i], this.arrayBattleships[nb-1]).length != 0) {
				return false;
			}
		}
		return true;
	}
	
	fixCurrent() {
		if (this.currentCanBeFixed() == true) {
			this.arrayBattleships[this.nbCurrentBattleship()-1].fix();
			return true;
		}
		return false;
	}
	
	// returns [bool1, bool2, bool3, bool4, bool5]
	// where boolx == true if the battleship x is still OK
	
	fleetStats() {
		let myArr = [];
		for (const battleship of this.arrayBattleships) {
			myArr.push(!(battleship.isSunk()));
		}
		return myArr;
	}
	
	isDead() {
		for (const battleship of this.arrayBattleships) {
			if (battleship.isSunk() == false) {
				return false;
			}			
		}
		return true;
	}
}