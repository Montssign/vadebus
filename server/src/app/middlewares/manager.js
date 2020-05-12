import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	const index = req.user.roles.findIndex((role) => role.name === 'manager')

	if (index >= 0) {
		return next()
	}
	throw new Exception({ status: 401 })
}
