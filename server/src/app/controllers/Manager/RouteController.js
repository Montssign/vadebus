import Route from '../../models/Route'
import Point from '../../models/Point'

class RouteController {
	async index(req, res) {
		const routes = await Route.findAll({
			where: { companyId: req.user.companyId },
			attributes: ['id', 'name', 'estimatedTime'],
			include: [
				{
					model: Point,
					as: 'points',
					attributes: ['id', 'name', 'index', 'lat', 'lng'],
					order: [['index', 'ASC']],
				},
			],
		})

		return res.json(routes)
	}

	async store(req, res) {
		const { id, name, estimatedTime } = await Route.create({
			...req.body,
			companyId: req.user.companyId,
		})

		const { points } = req.body
		if (points) {
			await Promise.all(
				points.map(async (point, index) => {
					delete point.id

					const findPoint = await Point.findOne({
						where: { lng: point.lng, lat: point.lat },
					})

					if (findPoint) {
						return findPoint.update({ index })
					}

					return Point.create({ ...point, index, routeId: id })
				})
			)
		}

		const allPoints = await Point.findAll({ where: { routeId: id } })
		return res.status(201).json({ id, name, estimatedTime, points: allPoints })
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

		const { points } = req.body
		if (points) {
			await Promise.all(
				points.map(async (point, index) => {
					delete point.id

					const findPoint = await Point.findOne({
						where: { lng: point.lng, lat: point.lat },
					})

					if (findPoint) {
						return findPoint.update({ index })
					}

					return Point.create({ ...point, index, routeId: id })
				})
			)
		}

		const allPoints = await Point.findAll({ where: { routeId: id } })

		return res.json({ id, name, estimatedTime, points: allPoints })
	}

	async destroy(req, res) {
		const { id } = req.params
		const { companyId } = req.user

		await Route.destroy({ where: { id, companyId } })

		return res.status(204).json()
	}
}

export default new RouteController()
