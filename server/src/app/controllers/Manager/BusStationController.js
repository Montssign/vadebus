import { googleApi } from '../../../services/api'
import CityScanned from '../../models/CityScanned'
import Sleep from '../../../lib/Sleep'
import BusStation from '../../models/BusStation'
import Company from '../../models/Company'

class BusStationController {
	async index(req, res) {
		const company = await Company.findByPk(req.user.companyId)
		await company.update({
			lastSearchCity: req.query.city,
			lastSearchState: req.query.state,
		})

		const city = req.query.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		const state = req.query.state
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')

		const cityQuery = `bus stations in ${city.toLowerCase()} - ${state.toLowerCase()}`

		const allPlaces = []
		async function getAllPages(nextPageToken) {
			let query = `/place/textsearch/json?query=${cityQuery}&key=${process.env.GOOGLE_TEXTSEARCH}`
			if (nextPageToken) {
				query += `&pagetoken=${nextPageToken}`
			}
			query.replace(/ /g, '%20')
			const getResults = await googleApi.get(query)
			allPlaces.splice(allPlaces.length, 0, ...getResults.data.results)

			if (getResults.data.next_page_token) {
				await Sleep(3000)
				await getAllPages(getResults.data.next_page_token)
			}
		}

		const findCity = await CityScanned.findOne({
			where: { cityQuery },
			include: [{ model: BusStation, as: 'busStations' }],
		})

		if (findCity) {
			return res.json(findCity)
		}

		const cityScanned = await CityScanned.create({
			cityQuery,
			createdById: req.user.id,
		})

		await getAllPages()

		await Promise.all(
			allPlaces.map(async (place) => {
				const findStation = await BusStation.findByPk(place.id)
				if (findStation) {
					console('Lugar ja existe:', place.name, place.id)
					return findStation
				}

				const station = await BusStation.create({
					id: place.id,
					name: place.name,
					placeTypes: place.types,
					lat: place.geometry.location.lat,
					lng: place.geometry.location.lng,
					cityScannedId: cityScanned.id,
				})
				return station
			})
		)

		const findCreatedCity = await CityScanned.findOne({
			where: { cityQuery },
			include: [{ model: BusStation, as: 'busStations' }],
		})

		return res.json(findCreatedCity)
	}
}

export default new BusStationController()
