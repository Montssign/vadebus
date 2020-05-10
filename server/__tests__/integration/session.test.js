import request from 'supertest'

import app from '../../src/app'
import truncate from '../util/truncate'
import factory from '../factories'

describe('Session', () => {
	beforeEach(async () => {
		await truncate()
	})

	// Authenticate a user

	it('should be able to make login to get token', async () => {
		const user = (await factory.create('User')).dataValues

		const response = await request(app).post('/api/sessions').send(user)

		expect(response.body).toHaveProperty('token')
	})

	it('should not be able to make login with wrong password to get token', async () => {
		const user = (await factory.create('User')).dataValues

		const response = await request(app)
			.post('/api/sessions')
			.send({ ...user, password: '123123123' })

		expect(response.status).toBe(401)
	})

	it('should not be able to make login with wrong email to get token', async () => {
		const user = (await factory.create('User')).dataValues

		const response = await request(app)
			.post('/api/sessions')
			.send({ ...user, email: 'felipe@monts.com.br' })

		expect(response.status).toBe(401)
	})

	it('should not be able to make login with invalid email to get token', async () => {
		const user = (await factory.create('User')).dataValues

		const response = await request(app)
			.post('/api/sessions')
			.send({ ...user, email: 'felipe@monts.' })

		expect(response.status).toBe(400)
	})

	it('should not be able to update a user email', async () => {
		await factory.create('User')

		const updateResponse = await request(app).put('/api/users').send({
			email: 'felipe@monts.com.br',
		})

		expect(updateResponse.status).toBe(401)
	})

	it('should not be able to update a user name with invalid token', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				name: 'Felipe Lima',
			})
			.set('Authorization', `Bearer ${`${token}123`}`)

		expect(updateResponse.status).toBe(401)
	})
})
