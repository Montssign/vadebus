import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import managerMiddleware from '../app/middlewares/manager'

import validateUserStore from '../app/validators/UserStore'
import validateUserUpdate from '../app/validators/UserUpdate'
import validateCompanyStore from '../app/validators/CompanyStore'
import validateCollectorStore from '../app/validators/CollectorStore'
import validateCollectorUpdate from '../app/validators/CollectorUpdate'
import validateFleetStore from '../app/validators/FleetStore'
import validateFleetUpdate from '../app/validators/FleetUpdate'

import UserController from '../app/controllers/Manager/UserController'
import CollectorController from '../app/controllers/Manager/CollectorController'
import FleetController from '../app/controllers/Manager/FleetController'

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
routes.get('/collectors/:id', CollectorController.show)
routes.put(
	'/collectors/:id',
	validateCollectorUpdate,
	CollectorController.update
)
routes.delete('/collectors/:id', CollectorController.destroy)

// Fleet
routes.get('/collectors', FleetController.index)
routes.post('/collectors', validateFleetStore, FleetController.store)
routes.get('/collectors/:id', FleetController.show)
routes.put('/collectors/:id', validateFleetUpdate, FleetController.update)
routes.delete('/collectors/:id', FleetController.destroy)

export default routes
