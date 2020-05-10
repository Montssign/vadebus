import jwt from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../../configs/auth'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'

class SessionController {
	async store(req, res) {
		const { email, password } = req.body

		const user = await User.findOne({
			where: { email },
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
			throw new Exception({
				status: 401,
				message: 'E-mail or password does not match',
			})
		}

		if (!(await user.checkPassword(password))) {
			throw new Exception({
				status: 401,
				message: 'E-mail or password does not match',
			})
		}

		const { id, name, roles } = user

		return res.json({
			user: {
				id,
				name,
				email,
				roles,
			},
			token: jwt.sign({ id, roles }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		})
	}
}

export default new SessionController()
