/* buildBattleshipStructure(1, 3, 1, 6)
   => [[1, 3, true], [1, 4, true], [1, 5, true], [1, 6, true]]
   where "true" means that this piece of the battleship is intact. */

function buildBattleshipStructure(x1, y1, x2, y2) {
	structure = [[x1, y1, true]];
	if (x1 != x2) {
		if (x1 < x2) {
			i = x1 + 1;
			do {
				structure.push([i, y1, true]);
				i++;
			} while (i <= x2);
		} else {
			i = x1 - 1;
			do {
				structure.push([i, y1, true]);
				i--;
			} while (i >= x2);		
		}
	} else {
		if (y1 < y2) {
			i = y1 + 1;
			do {
				structure.push([x1, i, true]);
				i++;
			} while (i <= y2);
		} else {
			i = y1 - 1;
			do {
				structure.push([x1, i, true]);
				i--;
			} while (i >= y2);		
		}		
	}
	return structure;
}

// Definition of the Battleship class

class Battleship {
	constructor(x1, y1, x2, y2) {
		this.structure = buildBattleshipStructure(x1, y1, x2, y2);
		this.fixed = false;
		this.sunk = false;
	}
		
	x1() {
		return this.structure[0][0];
	}
	
	y1() {
		return this.structure[0][1];
	}

	x2() {
		return this.structure[this.length()-1][0];
	}
	
	y2() {
		return this.structure[this.length()-1][1];
	}
	
	length() {
		return this.structure.length;
	}
	
	moveLeft() {
		if (this.x1() - 1 < 1 || this.x2() - 1 < 1 || this.fixed == true) {
			return false;
		}
		this.structure = buildBattleshipStructure(this.x1() - 1, this.y1(), this.x2() - 1, this.y2());
		return true;
	}
		
	moveRight() {
		if (this.x1() + 1 > 10 || this.x2() + 1 > 10 || this.fixed == true) {
			return false;
		}
		this.structure = buildBattleshipStructure(this.x1() + 1, this.y1(), this.x2() + 1, this.y2());
		return true;
	}
	
	moveDown() {
		if (this.y1() + 1 > 10 || this.y2() + 1 > 10 || this.fixed == true) {
			return false;
		}
		this.structure = buildBattleshipStructure(this.x1(), this.y1() + 1, this.x2(), this.y2() + 1);
		return true;
	}	
	
	moveUp() {
		if (this.y1() - 1 < 1 || this.y2() - 1 < 1 || this.fixed == true) {
			return false;
		}
		this.structure = buildBattleshipStructure(this.x1(), this.y1() - 1, this.x2(), this.y2() - 1);
		return true;
	}
	
	rotate() {
		if  (this.fixed == true) {
				return false;
		}
		let center = Math.round(this.length()/2);
		
		let new_x1;
		let new_x2;
		let new_y1;
		let new_y2;
		
		if (this.x1() == this.x2()) {
				new_y1 = this.structure[center][1];
				new_y2 = new_y1;
				
				new_x1 = this.structure[center][0];
				if (new_x1 + this.length() > 10) {
					new_x2 = new_x1 - this.length() + 1;
				} else {
					new_x2 = new_x1 + this.length() - 1;
				}
		} else {
				new_x1 = this.structure[center][0];
				new_x2 = new_x1;
				
				new_y1 = this.structure[center][1];
				if (new_y1 + this.length() > 10) {
					new_y2 = new_y1 - this.length() + 1;
				} else {
					new_y2 = new_y1 + this.length() - 1;
				}
		}
		this.structure = buildBattleshipStructure(new_x1, new_y1, new_x2, new_y2);				
		return true;
	}
	
	// fixes the battleship, so its position can no longer be modified
	
	fix() {
		this.fixed = true;
	}
	
	// sets the piece i of the battleship's structure as hit
	
	hit(i) {
		if (i >= 0 && i < this.length()) {
			this.structure[i][2] = false;
			return true;
		}
	return false;
	}
	
	// sets the battleship as sunk
	
	sink() {
		this.sunk = true;
	}
	
	// if sunk == false, isSunk() checks each piece of the battleship's structure if needed
	// if each piece is damaged (i.e. piece[2] == false), the battleship is set as sunk and isSunk() returns "true"
	
	isSunk() {
		if (this.sunk == true) {
			return true;
		} else {
			for (const piece of this.structure) {
				if (piece[2] == true) {
					return false;
				}
			}
			this.sink();
			return true;
		}
	}
}

// checks if two battleships' structures overlap
// if so: returns an array of the overlapping pieces
// if not: returns []

function checkOverlap(b1, b2) {
	let overlappingCells = [];
	
	for (const piece1 of b1.structure) {
		for (const piece2 of b2.structure) {
			if (piece1[0] == piece2[0] && piece1[1] == piece2[1]) {
				overlappingCells.push([piece1[0], piece1[1]]);
			}
		}
	}
	
	return overlappingCells;
}