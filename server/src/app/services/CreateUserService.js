import User from '../models/User'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'

class CreateUserService {
	async run({ userData, role }) {
		const userExists = await User.findOne({ where: { email: userData.email } })

		if (userExists) {
			throw new Exception({
				status: 401,
				message: 'User already exists',
			})
		}

		const user = await User.create(userData)

		const aclRole = await AclRole.findOne({ where: { name: role } })

		if (!aclRole) {
			await user.destroy({ force: true })
			throw new Exception({ status: 400, message: 'Invalid role' })
		}

		user.addRole(aclRole)

		const { id, name, email, phone, cpfOrCnpj } = user

		await Notification.create({
			content: `Seja muito bem vindo(a) ao Athos ${name}!`,
			user: id,
		})

		await Queue.add(WelcomeMail.key, { name, email })
		return {
			id,
			name,
			email,
			phone,
			cpfOrCnpj,
			roles: [{ name: aclRole.name }],
		}
	}
}

export default new CreateUserService()
