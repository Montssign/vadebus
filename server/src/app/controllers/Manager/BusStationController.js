import Sequelize from 'sequelize'
import { googleApi } from '../../../services/api'
import CityScanned from '../../models/CityScanned'
import BusStation from '../../models/BusStation'
import Address from '../../models/Address'
import { sleep } from '../../../lib/Utils'

class BusStationController {
	async index(req, res) {
		const { city, uf } = req.query

		const cityQuery = `${city} - ${uf}`

		const findCityScanned = await CityScanned.findOne({
			where: { cityQuery },
			attributes: ['cityQuery'],
			include: [
				{
					model: BusStation,
					as: 'busStations',
					attributes: ['id', 'name', 'placeId', 'lat', 'lng'],
				},
			],
		})

		if (findCityScanned) {
			return res.json(findCityScanned)
		}

		function normalize(string) {
			return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		}

		const neighborhoods = await Address.findAll({
			where: { city, uf },
			attributes: [
				'neighborhood',
				'city',
				'uf',
				'lat',
				'lng',
				Sequelize.fn('count', Sequelize.col('cep')),
			],
			group: ['neighborhood', 'city', 'uf', 'lat', 'lng'],
		})

		const allNeighborhoods = await Promise.all(
			neighborhoods.map(async (address) => {
				if (!address.lat || !address.lng) {
					const { data } = await googleApi.get(
						`/place/textsearch/json?query=${normalize(
							address.neighborhood
						)}, ${normalize(city)} - ${uf}&key=${process.env.GOOGLE_TEXTSEARCH}`
					)
					const lat =
						(data.results[0] && data.results[0].geometry.location.lat) || null
					const lng =
						(data.results[0] && data.results[0].geometry.location.lng) || null
					return Address.update(
						{ lat, lng },
						{ where: { city, uf, neighborhood: address.neighborhood } }
					)
				}
				return address
			})
		)

		async function getAllPages(address, nextPageToken) {
			const allResults = []
			const { data } = await googleApi.get(
				`/place/nearbysearch/json?location=${address.lat},${
					address.lng
				}&radius=1000&types=transit_station&types=bus_station&types=train_station&types=moving_company&key=${
					process.env.GOOGLE_TEXTSEARCH
				}${nextPageToken ? `&pagetoken=${nextPageToken}` : ''}`
			)

			allResults.splice(0, 0, ...data.results)

			if (data.next_page_token) {
				sleep(1000)
				allResults.splice(
					0,
					0,
					await getAllPages(address, data.next_page_token)
				)
			}

			return allResults
		}

		const cityScanned = await CityScanned.create({ cityQuery })

		await Promise.all(
			allNeighborhoods.map(async (address) => {
				if (address.lat && address.lng) {
					return Promise.all(
						(await getAllPages(address)).map(async (item) => {
							if (item.geometry) {
								return BusStation.findOrCreate({
									where: {
										id: item.id,
										name: item.name,
										placeId: item.place_id,
										types: JSON.stringify(item.types),
										lat: item.geometry.location.lat,
										lng: item.geometry.location.lng,
										cityScannedId: cityScanned.id,
									},
								})
							}
						})
					)
				}
				return address
			})
		)

		const findNewCityScanned = await CityScanned.findOne({
			where: { cityQuery },
			attributes: ['cityQuery'],
			include: [
				{
					model: BusStation,
					as: 'busStations',
					attributes: ['id', 'name', 'placeId', 'lat', 'lng'],
				},
			],
		})

		return res.json(findNewCityScanned)
	}

	async store(req, res) {
		const { lat, lng } = req.body

		return res.json({ lat, lng })
	}
}

export default new BusStationController()
