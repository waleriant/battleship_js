function buildBattleship(x1, y1, x2, y2) {
	myArray = [[x1, y1]]
	if (x1 != x2) {
		if (x1 < x2) {
			i = x1 + 1;
			do {
				myArray.push([i, y1]);
				i++;
			} while (i <= x2);
		} else {
			i = x1 - 1;
			do {
				myArray.push([i, y1]);
				i--;
			} while (i >= x2);		
		}
	} else {
		if (y1 < y2) {
			i = y1 + 1;
			do {
				myArray.push([x1, i]);
				i++;
			} while (i <= y2);
		} else {
			i = y1 - 1;
			do {
				myArray.push([x1, i]);
				i--;
			} while (i >= y2);		
		}		
	}
	return myArray;
}

class Battleship {
	constructor(length, x1, y1, x2, y2) {
	}
}

class BattleshipArray {
}