import { Router } from 'express'
import multer from 'multer'
import Brute from 'express-brute'
import BruteRedis from 'express-brute-redis'

import multerConfg from './configs/multer'
import redisConfig from './configs/redis'

import authMiddleware from './app/middlewares/auth'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateSessionStore from './app/validators/SessionStore'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import NotificationController from './app/controllers/NotificationController'

const routes = Router()
const upload = multer(multerConfg)

routes.get('/', (req, res) => res.json({ message: 'Hello from Athos api' }))

routes.post('/users', validateUserStore, UserController.store)
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

routes.get('/files', FileController.index)
routes.post('/files', upload.array('file', 5), FileController.store)

export default routes
