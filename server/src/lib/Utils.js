export function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

export function sanitizeNumbers(value) {
	const testMath = value.match(/\d+/g) || []

	return testMath.join('')
}
