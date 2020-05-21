import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import managerMiddleware from '../app/middlewares/manager'
import commonsMiddleware from '../app/middlewares/commons'

import validateUserStore from '../app/validators/UserStore'
import validateUserUpdate from '../app/validators/UserUpdate'
import validateCompanyStore from '../app/validators/CompanyStore'
import validateCollectorStore from '../app/validators/CollectorStore'
import validateCollectorUpdate from '../app/validators/CollectorUpdate'
import validateCarStore from '../app/validators/CarStore'
import validateCarUpdate from '../app/validators/CarUpdate'
import validateRouteStore from '../app/validators/RouteStore'
import validateRouteUpdate from '../app/validators/RouteUpdate'
import validatePointStore from '../app/validators/PointStore'
import validatePointUpdate from '../app/validators/PointUpdate'

import UserController from '../app/controllers/Manager/UserController'
import CollectorController from '../app/controllers/Manager/CollectorController'
import CarController from '../app/controllers/Manager/CarController'
import RouteController from '../app/controllers/Manager/RouteController'
import PointController from '../app/controllers/Manager/PointController'
import BusStationController from '../app/controllers/Manager/BusStationController'

const routes = Router()

routes.get('/', (req, res) => res.json({ message: 'Hello from Athos api' }))

routes.post(
	'/users',
	validateUserStore,
	validateCompanyStore,
	UserController.store
)

routes.use(commonsMiddleware.preauth())

routes.use(authMiddleware)
routes.use(managerMiddleware)

routes.use(commonsMiddleware.postauth())

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
routes.get('/cars', CarController.index)
routes.post('/cars', validateCarStore, CarController.store)
routes.get('/cars/:id', CarController.show)
routes.put('/cars/:id', validateCarUpdate, CarController.update)
routes.delete('/cars/:id', CarController.destroy)

// Routes
routes.get('/routes', RouteController.index)
routes.post('/routes', validateRouteStore, RouteController.store)
routes.get('/routes/:id', RouteController.show)
routes.put('/routes/:id', validateRouteUpdate, RouteController.update)
routes.delete('/routes/:id', RouteController.destroy)

// Points
routes.get('/points', PointController.index)
routes.post('/points', validatePointStore, PointController.store)
routes.get('/points/:id', PointController.show)
routes.put('/points/:id', validatePointUpdate, PointController.update)
routes.delete('/points/:id', PointController.destroy)

routes.get('/bus-stations', BusStationController.index)

export default routes
