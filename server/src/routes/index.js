import { Router } from 'express'
import multer from 'multer'

import manager from './manager'
import client from './client'

import multerConfg from '../configs/multer'

import sessionMiddleware from '../app/middlewares/session'
import setNullEmptyMiddleware from '../app/middlewares/setNullEmpty'

import FileController from '../app/controllers/FileController'
import NotificationController from '../app/controllers/NotificationController'

const routes = Router()
const upload = multer(multerConfg)

routes.use(setNullEmptyMiddleware)

routes.use(sessionMiddleware)

routes.use('/manager', manager)
routes.use('/client', client)

routes.get('/files', FileController.index)
routes.post('/files', upload.array('file', 5), FileController.store)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

export default routes
