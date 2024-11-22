/* buildBattleship(1, 3, 1, 6)
   => [[1, 3, true], [1, 4, true], [1, 5, true], [1, 6, true]]
   where "true" means that this piece of the battleship is intact. */

function buildBattleship(x1, y1, x2, y2) {
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

class Battleship {
	constructor(id, length, color, x1, y1, x2, y2) {
		this.id = id;
		this.length = length;
		this.color = color;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y1;
		this.structure = buildBattleship(x1, y1, x2, y2);
		this.fixed = false;
		this.sunk = false;
		
		moveLeft() {
			if (this.x1 - 1 < 1 || this.x2 - 1 < 1) {
				return false;
			} else {
				let i = 0;
				while (i < this.structure.length) {
					this.structure[i][0]--;
					i++;
				}
			}
		}
		
		moveRight() {
			if (this.x1 + 1 > 10 || this.x2 + 1 < 10) {
				return false;
			} else {
				let i = 0;
				while (i < this.structure.length) {
					this.structure[i][0]++;
					i++;
				}
			}
		}
		
		moveDown() {
			if (this.y1 - 1 < 1 || this.y2 - 1 < 1) {
				return false;
			} else {
				let i = 0;
				while (i < this.structure.length) {
					this.structure[i][1]--;
					i++;
				}
			}
		}	
		
		moveUp() {
			if (this.y1 + 1 > 10 || this.y2 + 1 > 10) {
				return false;
			} else {
				let i = 0;
				while (i < this.structure.length) {
					this.structure[i][1]++;
					i++;
				}
			}
		}
		
		rotate() {
			center = Math.ceil(this.structure.length/2);
			if (this.x1 == this.x2) {

			} else {
				
			}		
		}
		
		// fixes the battleship => its position can no longer be modified
		
		fix() {
			this.fixed = true;
		}
		
		// sets the battleship as sunk
		
		setSunk() {
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
			this.setSunk();
			return true;
		}
	}
}

class BattleshipArray {
}