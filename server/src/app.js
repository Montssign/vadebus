import './bootstrap'

import express from 'express'
import path from 'path'
import helmet from 'helmet'
import redis from 'redis'
import cors from 'cors'
import RateLimit from 'express-rate-limit'
import RateLimitRedis from 'rate-limit-redis'
import Youch from 'youch'
import * as Sentry from '@sentry/node'

import 'express-async-errors'
import './database'

import routes from './routes'
import sentryConfig from './configs/sentry'
import redisConfig from './configs/redis'
import Exception from './app/exceptions/Exception'

const whiteList = [
	process.env.ORIGIN_URL,
	'https://vadebus.com',
	'https://www.vadebus.com',
	'http://vadebus.com',
	'http://www.vadebus.com',
]
const corsOptions = {
	// origin(origin, callback) {
	// 	if (whiteList.findIndex(origin) >= 0) {
	// 		callback(null, true)
	// 	} else {
	// 		callback(new Error('Not allowed by CORS'))
	// 	}
	// },
	origin: [],
}

class App {
	constructor() {
		this.server = express()

		Sentry.init(sentryConfig)

		this.middlewares()
		this.routes()
		this.exceptionHandler()
	}

	middlewares() {
		this.server.use(Sentry.Handlers.requestHandler())
		this.server.use(express.json())
		this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		)

		if (
			process.env.NODE_ENV === 'development' ||
			process.env.NODE_ENV === 'test'
		) {
			this.server.use(cors())
		} else {
			this.server.use(helmet())
			this.server.use(cors())
			this.server.use(
				new RateLimit({
					store: new RateLimitRedis({
						client: redis.createClient(redisConfig),
					}),
					windowMs: 1000 * 60,
					max: 200,
				})
			)
		}
	}

	routes() {
		this.server.use(express.static(path.resolve(__dirname, '..', 'public')))

		this.server.use('/api', routes)

		this.server.use('/api', () => {
			throw new Exception({ status: 404 })
		})

		this.server.use('*.json', (req, res) =>
			res.sendFile(
				path.resolve(__dirname, '..', path.join('public', req.baseUrl))
			)
		)
		this.server.use(
			'*',
			express.static(path.resolve(__dirname, '..', 'public', 'index.html'))
		)

		this.server.use(Sentry.Handlers.errorHandler())
	}

	exceptionHandler() {
		this.server.use(async (err, req, res, next) => {
			const status = err.status || 500
			if (
				process.env.NODE_ENV === 'development' ||
				process.env.NODE_ENV === 'test'
			) {
				const errors = await new Youch(err, req).toJSON()
				errors.data = err.data || []
				return res.status(status).json(errors)
			}

			return res.status(status).json({
				error: {
					message: err.status === 500 ? 'Internal server error' : err.message,
					name: err.status === 500 ? 'Internal server error' : err.name,
					status,
				},
				data: err.data || [],
			})
		})
	}
}

export default new App().server
