import { Router } from 'express'

import manager from './manager'
import client from './client'

import setNullEmptyMiddleware from '../app/middlewares/setNullEmpty'

const routes = Router()

routes.use(setNullEmptyMiddleware)

routes.use('/manager', manager)
routes.use('/client', client)

export default routes
