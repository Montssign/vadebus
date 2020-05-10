import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'

import validateUserStore from '../app/validators/UserStore'
import validateUserUpdate from '../app/validators/UserUpdate'

import UserController from '../app/controllers/Client/UserController'

const routes = Router()

routes.get('/', (req, res) => res.json({ message: 'Hello from Athos api' }))

routes.post('/users', validateUserStore, UserController.store)

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)

export default routes
