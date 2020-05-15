import Sequelize from 'sequelize'
import Route from '../models/Route'

const INITIAL_DATA = { user: null, routes: [] }
class AssociateUserToRouteService {
	async run(payload = INITIAL_DATA) {
		const { user, routes: searchRoute } = payload

		if (Array.isArray(searchRoute)) {
			const searchRoutes = searchRoute.map((id) => ({ id }))
			const routes = await Route.findAll({
				where: Sequelize.or(...searchRoutes),
			})

			await Promise.all(
				routes.map(async (route) => {
					return route.addCollector(user)
				})
			)

			return
		}

		const route = await Route.findOne({ where: { id: searchRoute } })

		await route.addCollector(user)
	}
}

export default new AssociateUserToRouteService()
