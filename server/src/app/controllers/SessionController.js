import jwt from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../../configs/auth'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'
import File from '../models/File'

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
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
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

		const { id, name, phone, avatar, roles } = user

		return res.status(201).json({
			user: {
				id,
				name,
				email,
				phone,
				roles,
				avatar,
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		})
	}
}

export default new SessionController()
