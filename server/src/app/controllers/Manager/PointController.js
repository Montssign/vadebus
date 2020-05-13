import Point from '../../models/Point'
import Route from '../../models/Route'
import Exception from '../../exceptions/Exception'

class PointController {
	async index(req, res) {
		const { routeId } = req.query
		if (!routeId) {
			throw new Exception({
				status: 400,
				message: 'RouteId is needed in query param',
			})
		}

		const { points } = await Route.findByPk(routeId, {
			include: [
				{
					model: Point,
					as: 'points',
					attributes: ['id', 'name', 'index', 'latitude', 'longitude'],
				},
			],
		})

		if (!points) {
			throw new Exception({ status: 404 })
		}

		return res.json(points)
	}

	async store(req, res) {
		const { routeId } = req.query
		if (!routeId) {
			throw new Exception({
				status: 400,
				message: 'RouteId is needed in query param',
			})
		}

		const { points, companyId } = await Route.findByPk(routeId, {
			include: [
				{
					model: Point,
					as: 'points',
					attributes: ['id'],
				},
			],
		})

		if (!points) {
			throw new Exception({ status: 404 })
		}

		if (companyId !== req.user.companyId) {
			throw new Exception({ status: 401 })
		}

		const index = points.length

		const { id, name, latitude, longitude } = await Point.create({
			...req.body,
			index,
			routeId,
		})

		return res.status(201).json({ id, name, index, latitude, longitude })
	}

	async show(req, res) {
		const { routeId } = req.query
		if (!routeId) {
			throw new Exception({
				status: 400,
				message: 'RouteId is needed in query param',
			})
		}

		const point = await Point.findOne({
			where: { id: req.params.id, routeId },
			attributes: ['id', 'name', 'index', 'latitude', 'longitude'],
		})

		return res.json(point)
	}

	async update(req, res) {
		const { routeId } = req.query
		if (!routeId) {
			throw new Exception({
				status: 400,
				message: 'RouteId is needed in query param',
			})
		}

		const point = await Point.findOne({
			where: { id: req.params.id, routeId },
		})

		const { id, name, index, latitude, longitude } = await point.update(
			req.body
		)

		return res.json({ id, name, index, latitude, longitude })
	}

	async destroy(req, res) {
		const { routeId } = req.query
		if (!routeId) {
			throw new Exception({
				status: 400,
				message: 'RouteId is needed in query param',
			})
		}

		await Point.destroy({
			where: { id: req.params.id, routeId },
		})

		return res.status(204).json()
	}
}

export default new PointController()
