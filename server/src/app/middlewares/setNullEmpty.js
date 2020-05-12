import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	function checkAndChange(objectOrArray) {
		Object.keys(objectOrArray).forEach((key) => {
			const item = objectOrArray[key]
			if (item === null) {
				return
			}
			if (item === '') {
				objectOrArray[key] = null
				return
			}
			if (typeof item === 'object') {
				checkAndChange(item)
			}
		})
	}

	try {
		checkAndChange(req.body)
		next()
	} catch (err) {
		throw new Exception({ status: 400 })
	}
}
