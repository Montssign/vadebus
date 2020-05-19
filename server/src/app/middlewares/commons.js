import Brute from 'express-brute'
import BruteRedis from 'express-brute-redis'
import { Router } from 'express'

import validateSessionStore from '../validators/SessionStore'
import SessionController from '../controllers/SessionController'
import redisConfig from '../../configs/redis'
import NotificationController from '../controllers/NotificationController'

export default {
	preauth() {
		const routes = Router()
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.NODE_ENV === 'test'
		) {
			routes.post('/sessions', validateSessionStore, SessionController.store)
		} else {
			const bruteStore = new BruteRedis(redisConfig)
			const bruteForce = new Brute(bruteStore)

			routes.post(
				'/sessions',
				bruteForce.prevent,
				validateSessionStore,
				SessionController.store
			)
		}

		return routes
	},
	postauth() {
		const routes = Router()
		routes.get('/notifications', NotificationController.index)
		routes.put('/notifications/:id', NotificationController.update)

		return routes
	},
}
