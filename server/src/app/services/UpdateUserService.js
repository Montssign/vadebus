import User from '../models/User'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'
import File from '../models/File'

class CreateUserService {
	async run({ userData, userId }) {
		const { email, oldPassword, password } = userData
		delete userData.oldPassword
		delete userData.password
		delete userData.confirmPassword

		const user = await User.findByPk(userId)

		if (email && email !== user.email) {
			const userExists = await User.findOne({
				where: { email },
			})

			if (userExists) {
				throw new Exception({
					status: 401,
					message: 'User already exists',
				})
			}
		}

		if (oldPassword) {
			if (!(await user.checkPassword(oldPassword))) {
				throw new Exception({
					status: 401,
					message: 'Password does not match',
				})
			}
			await user.update({ password })
		}

		const { id, name, cpfOrCnpj, phone } = await user.update(userData)

		const { roles, avatar } = await User.findByPk(id, {
			attributes: ['id'],
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

		return {
			id,
			name,
			cpfOrCnpj,
			email: email || user.email,
			roles,
			avatar,
			phone,
		}
	}
}

export default new CreateUserService()
