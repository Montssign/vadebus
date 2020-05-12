import Sequelize from 'sequelize'

import CreateUserService from '../../services/CreateUserService'
import UpdateUserService from '../../services/UpdateUserService'
import User from '../../models/User'
import AclRole from '../../models/AclRole'
import File from '../../models/File'

class CollectorController {
	async index(req, res) {
		const collectors = await User.findAll({
			attributes: ['id', 'name'],
			include: [
				{
					model: AclRole,
					as: 'roles',
					where: Sequelize.or({ name: 'driver' }, { name: 'collector' }),
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

		return res.json(collectors)
	}

	async store(req, res) {
		const { role } = req.body

		const user = await CreateUserService.run({
			userData: req.body,
			role,
		})

		user.companyId = req.user.companyId
		await user.save()

		const { id, name, email, roles } = user

		return res.status(201).json({ id, name, email, roles })
	}

	async update(req, res) {
		const userId = req.params.id

		const user = await UpdateUserService.run({
			userData: req.body,
			userId,
		})

		return res.json(user)
	}

	async destroy(req, res) {
		const { id } = req.params
		await User.destroy({ where: { id }, force: true })

		return res.status(204).json()
	}
}

export default new CollectorController()
