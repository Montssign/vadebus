import Sequelize from 'sequelize'
import Route from '../models/Route'

const INITIAL_DATA = { car: null, routes: [] }
class AssociateCarToRouteService {
	async run(payload = INITIAL_DATA) {
		const { car, routes: searchRoute } = payload

		if (Array.isArray(searchRoute)) {
			const searchRoutes = searchRoute.map((id) => ({ id }))
			const routes = await Route.findAll({
				where: Sequelize.or(...searchRoutes),
			})

			await Promise.all(
				routes.map(async (route) => {
					return route.addCar(car)
				})
			)

			return
		}

		const route = await Route.findOne({ where: { id: searchRoute } })

		await route.addCar(car)
	}
}

export default new AssociateCarToRouteService()
