import Car from '../../models/Car'
import Exception from '../../exceptions/Exception'
import AssociateCarToRouteService from '../../services/AssociateCarToRouteService'

class CarController {
	async index(req, res) {
		const cars = await Car.findAll({
			where: { companyId: req.user.companyId },
			attributes: ['id', 'brand', 'plate', 'number', 'seats'],
		})

		return res.json(cars)
	}

	async store(req, res) {
		const { routes } = req.body
		delete req.body.routes

		const car = await Car.create({
			...req.body,
			companyId: req.user.companyId,
		})

		// await AssociateCarToRouteService.run({ car, routes })

		const { id, brand, plate, number, seats } = car

		return res.status(201).json({ id, brand, plate, number, seats })
	}

	async show(req, res) {
		const car = await Car.findByPk(req.params.id, {
			attributes: ['id', 'brand', 'plate', 'number', 'seats', 'companyId'],
		})

		if (car.companyId !== req.user.companyId) {
			throw new Exception({ status: 404 })
		}

		const { id, brand, plate, number, seats } = car

		return res.json({ id, brand, plate, number, seats })
	}

	async update(req, res) {
		const { routes } = req.body
		delete req.body.routes

		const car = await Car.findByPk(req.params.id)

		await AssociateCarToRouteService.run({ car, routes })

		if (car.companyId !== req.user.companyId) {
			throw new Exception({ status: 404 })
		}

		const { id, brand, plate, number, seats } = await car.update(req.body)

		return res.json({ id, brand, plate, number, seats })
	}

	async destroy(req, res) {
		const { id } = req.params
		const { force } = req.body
		await Car.destroy({ where: { id }, force })

		return res.status(204).json()
	}
}

export default new CarController()
