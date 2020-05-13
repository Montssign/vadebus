import Route from '../../models/Route'

class RouteController {
	async index(req, res) {
		const routes = await Route.findAll({
			where: { companyId: req.user.companyId },
			attributes: ['id', 'name', 'estimatedTime'],
		})

		return res.json(routes)
	}

	async store(req, res) {
		const { id, name, estimatedTime } = await Route.create({
			...req.body,
			companyId: req.user.companyId,
		})

		return res.status(201).json({ id, name, estimatedTime })
	}

	async show(req, res) {
		const route = await Route.findByPk(req.params.id, {
			attributes: ['id', 'name', 'estimatedTime'],
		})

		return res.json(route)
	}

	async update(req, res) {
		const route = await Route.findByPk(req.params.id)

		const { id, name, estimatedTime } = await route.update(req.body)

		return res.json({ id, name, estimatedTime })
	}

	async destroy(req, res) {
		const { id } = req.params
		const { companyId } = req.user

		await Route.destroy({ where: { id, companyId } })

		return res.status(204).json()
	}
}

export default new RouteController()
