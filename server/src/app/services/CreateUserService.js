import User from '../models/User'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'
import AssociateUserToRoleService from './AssociateUserToRoleService'

class CreateUserService {
	async run({ userData, role }) {
		const userExists = await User.findOne({ where: { email: userData.email } })

		if (userExists) {
			throw new Exception({
				status: 401,
				message: 'User already exists',
			})
		}

		const createdUser = await User.create(userData)

		try {
			await AssociateUserToRoleService.run({ user: createdUser, role })
		} catch (err) {
			await createdUser.destroy({ force: true })
			throw new Exception({ status: 400, message: 'Invalid role' })
		}

		const { id, name, email } = createdUser

		await Notification.create({
			content: `Seja muito bem vindo(a) ao VádeBus ${name}!`,
			user: id,
		})

		const user = await User.findByPk(id, {
			include: [
				{
					model: AclRole,
					as: 'roles',
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		})

		await Queue.add(WelcomeMail.key, { name, email })
		return user
	}
}

export default new CreateUserService()
