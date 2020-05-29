import Company from '../../models/Company'
import { googleApi } from '../../../services/api'

class CompanyController {
	async show(req, res) {
		const company = await Company.findByPk(req.user.companyId)

		return res.json(company)
	}

	async update(req, res) {
		const city = req.query.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		const state = req.query.state
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')

		const query = `/place/textsearch/json?query=${city}, ${state}&key=${process.env.GOOGLE_TEXTSEARCH}`
		const { data } = await googleApi.get(query)

		const { location } = data.results[0].geometry

		const company = await Company.findByPk(req.user.companyId)

		const {
			lastSearchCity,
			lastSearchState,
			locationLat,
			locationLng,
		} = await company.update({
			lastSearchCity: req.query.city,
			lastSearchState: req.query.state,
			locationLat: location.lat,
			locationLng: location.lng,
		})

		return res.json({
			lastSearchCity,
			lastSearchState,
			locationLat,
			locationLng,
		})
	}
}

export default new CompanyController()
