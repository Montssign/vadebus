import Exception from '../exceptions/Exception'
import { sanitizeNumbers } from '../../lib/Utils'

export default async (req, res, next) => {
	const toSanitize = ['cpfOrCnpj', 'cnpj', 'phone', 'cep']

	function checkAndChange(objectOrArray) {
		Object.keys(objectOrArray).forEach((key) => {
			const item = objectOrArray[key]

			Object.keys(toSanitize).forEach((sanitizeKey) => {
				const checkItem = toSanitize[sanitizeKey]
				if (key === checkItem) {
					objectOrArray[key] = sanitizeNumbers(item)
				}
			})

			if (typeof item === 'object') {
				checkAndChange(item)
			}
		})
	}

	try {
		checkAndChange(req.body)
		checkAndChange(req.query)
		next()
	} catch (err) {
		throw new Exception({ status: 500 })
	}
}
