import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import managerMiddleware from '../app/middlewares/manager'

import validateUserStore from '../app/validators/UserStore'
import validateUserUpdate from '../app/validators/UserUpdate'
import validateCompanyStore from '../app/validators/CompanyStore'
import validateCollectorStore from '../app/validators/CollectorStore'

import UserController from '../app/controllers/Manager/UserController'
import CollectorController from '../app/controllers/Manager/CollectorController'

const routes = Router()

routes.get('/', (req, res) => res.json({ message: 'Hello from Athos api' }))

routes.post(
	'/users',
	validateUserStore,
	validateCompanyStore,
	UserController.store
)

routes.use(authMiddleware)
routes.use(managerMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)

// Collectors
routes.get('/collectors', CollectorController.index)
routes.post('/collectors', validateCollectorStore, CollectorController.store)
routes.put('/collectors/:id', CollectorController.update)
routes.delete('/collectors/:id', CollectorController.destroy)

export default routes
