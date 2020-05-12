import { Router } from 'express'
import Brute from 'express-brute'
import BruteRedis from 'express-brute-redis'
import multer from 'multer'

import manager from './manager'
import client from './client'

import redisConfig from '../configs/redis'
import multerConfg from '../configs/multer'

import setNullEmptyMiddleware from '../app/middlewares/setNullEmpty'

import validateSessionStore from '../app/validators/SessionStore'

import SessionController from '../app/controllers/SessionController'
import FileController from '../app/controllers/FileController'
import NotificationController from '../app/controllers/NotificationController'

const routes = Router()
const upload = multer(multerConfg)

routes.use(setNullEmptyMiddleware)

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

routes.use('/manager', manager)
routes.use('/client', client)

routes.get('/files', FileController.index)
routes.post('/files', upload.array('file', 5), FileController.store)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

export default routes
