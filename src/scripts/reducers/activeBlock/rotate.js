export default function rotateBlock (current) {
	const newCurrent = []
	for (let y = 0; y < current.length; y++) {
		newCurrent[y] = []
		for (let x = 0; x < current.length; x++) {
			newCurrent[y][x] = current[(current.length - 1) - x][y]
		}
	}
	return newCurrent
}
