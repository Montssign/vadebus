import Sequelize, { Op } from 'sequelize'
import Address from '../../models/Address'
import Exception from '../../exceptions/Exception'

class AddressController {
	async index(req, res) {
		const { uf, limit = 30, page = 1, query } = req.query
		if (!uf) {
			const addresses = await Address.findAll({
				attributes: ['uf', Sequelize.fn('count', Sequelize.col('cep'))],
				group: ['uf'],
			})
			return res.json({ results: addresses })
		}

		if (uf) {
			const searchQuery = !query
				? { uf }
				: {
						[Op.and]: [{ uf }, { city: { [Op.iLike]: `%${query}%` } }],
				  }

			const count = (
				await Address.count({
					where: searchQuery,
					group: ['city'],
				})
			).length
			const addresses = await Address.findAll({
				attributes: ['city'],
				group: ['city'],
				where: searchQuery,
				// limit,
				// offset: (Number(page) - 1) * Number(limit),
			})

			// const nextPage = page * limit <= count ? Number(page) + 1 : null

			const returned = {}
			returned.total = count
			// if (nextPage) {
			// 	returned.nextPage = nextPage
			// }
			returned.results = addresses

			return res.json(returned)
		}
		throw new Exception({ status: 404 })
	}
}

export default new AddressController()
