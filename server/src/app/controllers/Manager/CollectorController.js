import Sequelize from 'sequelize'

import CreateUserService from '../../services/CreateUserService'
import UpdateUserService from '../../services/UpdateUserService'
import User from '../../models/User'
import AclRole from '../../models/AclRole'
import File from '../../models/File'
import Exception from '../../exceptions/Exception'

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

	async show(req, res) {
		const collector = await User.findByPk(req.params.id, {
			attributes: ['id', 'name', 'email', 'login', 'phone', 'cpfOrCnpj'],
			where: { companyId: req.user.companyId },
			include: [
				{ model: AclRole, as: 'roles', through: { attributes: [] } },
				{ model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
			],
		})

		if (!collector) {
			throw new Exception({ status: 404 })
		}

		return res.json(collector)
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
		const { force } = req.body
		await User.destroy({ where: { id }, force })

		return res.status(204).json()
	}
}

export default new CollectorController()
