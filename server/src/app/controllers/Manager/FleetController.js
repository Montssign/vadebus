import Fleet from '../../models/Fleet'
import Exception from '../../exceptions/Exception'

class FleetController {
	async index(req, res) {
		const fleets = await Fleet.findAll({
			where: { companyId: req.user.companyId },
			attributes: ['id', 'brand', 'plate', 'number', 'seats'],
		})

		return res.json(fleets)
	}

	async store(req, res) {
		const { id, brand, plate, number, seats } = await Fleet.create({
			...req.body,
			companyId: req.user.companyId,
		})

		return res.status(201).json({ id, brand, plate, number, seats })
	}

	async show(req, res) {
		const fleet = await Fleet.findByPk(req.params.id, {
			attributes: ['id', 'brand', 'plate', 'number', 'seats', 'companyId'],
		})

		if (fleet.companyId !== req.user.companyId) {
			throw new Exception({ status: 404 })
		}

		const { id, brand, plate, number, seats } = fleet

		return res.json({ id, brand, plate, number, seats })
	}

	async update(req, res) {
		const fleet = await Fleet.findByPk(req.params.id)

		if (fleet.companyId !== req.user.companyId) {
			throw new Exception({ status: 404 })
		}

		const { id, brand, plate, number, seats } = await fleet.update(req.body)

		return res.json({ id, brand, plate, number, seats })
	}

	async destroy(req, res) {
		const { id } = req.params
		const { force } = req.body
		await Fleet.destroy({ where: { id }, force })

		return res.status(204).json()
	}
}

export default new FleetController()
