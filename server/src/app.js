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

const whiteList = [process.env.ORIGIN_URL]
const corsOptions = {
	origin(origin, callback) {
		if (whiteList.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
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
			this.server.use(cors(corsOptions))
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
			throw new Error()
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
				return res.status(status).json(errors)
			}

			return res.status(status).json({
				message: err.status === 500 ? 'Internal server error' : err.message,
				data: err.data || [],
			})
		})
	}
}

export default new App().server
