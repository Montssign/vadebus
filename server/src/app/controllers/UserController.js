import User from '../models/User'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'

class UserController {
	async store(req, res) {
		const { role = 'client' } = req.body
		const userExists = await User.findOne({ where: { email: req.body.email } })

		if (userExists) {
			throw new Exception({
				status: 401,
				message: 'User already exists',
			})
		}

		const user = await User.create(req.body)

		const aclRole = await AclRole.findOne({ where: { name: role } })

		if (!aclRole) {
			await user.destroy({ force: true })
			throw new Exception({ status: 400, message: 'Invalid role' })
		}

		user.addRole(aclRole)

		const { id, name, email } = user

		await Notification.create({
			content: `Seja muito bem vindo(a) ao Athos ${name}!`,
			user: id,
		})

		await Queue.add(WelcomeMail.key, { name, email })

		return res.json({ id, name, email, roles: [{ name: aclRole.name }] })
	}

	async update(req, res) {
		const { email, oldPassword, password } = req.body
		delete req.body.oldPassword
		delete req.body.password
		delete req.body.confirmPassword

		const user = await User.findByPk(req.user.id)

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

		const { id, name } = await user.update(req.body)

		const { roles } = await User.findByPk(id, {
			attributes: ['id'],
			include: [
				{
					model: AclRole,
					as: 'roles',
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		})

		return res.json({ id, name, email: email || user.email, roles })
	}
}

export default new UserController()
