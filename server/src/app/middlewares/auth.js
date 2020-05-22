import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../configs/auth'
import User from '../models/User'
import AclRole from '../models/AclRole'
import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ error: 'Token not provided' })
	}

	const [, token] = authHeader.split(' ')

	try {
		const decoded = await promisify(jwt.verify)(token, authConfig.secret)

		const user = await User.findByPk(decoded.id, {
			attributes: [
				'id',
				'name',
				'email',
				'login',
				'phone',
				'cpfOrCnpj',
				'companyId',
			],
			include: [
				{
					model: AclRole,
					as: 'roles',
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		})

		if (!user) {
			throw new Exception({ status: 404 })
		}

		req.user = user

		return next()
	} catch (error) {
		return res.status(401).json({ error: 'Invalid token' })
	}
}
