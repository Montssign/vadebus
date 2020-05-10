import request from 'supertest'

import app from '../../src/app'
import truncate from '../util/truncate'
import factory from '../factories'

describe('User', () => {
	beforeEach(async () => {
		await truncate()
	})

	// Register a user

	it('should be able to register', async () => {
		const user = await factory.attrs('User')

		const response = await request(app).post('/api/users').send(user)

		expect(response.body).toHaveProperty('id')
	})

	it('should not be able to register with invalid role', async () => {
		const user = await factory.attrs('User')

		user.role = 'member'

		const response = await request(app).post('/api/users').send(user)

		expect(response.status).toBe(400)
	})

	it('should not be able to register with duplicated email', async () => {
		const user = await factory.attrs('User')

		await request(app).post('/api/users').send(user)

		const response = await request(app).post('/api/users').send(user)

		expect(response.status).toBe(401)
	})

	it('should not be able to register with invalid password', async () => {
		const user = await factory.attrs('User', { password: '12312' })

		const response = await request(app).post('/api/users').send(user)

		expect(response.status).toBe(400)
	})

	it('should encrypt user password when new user created', async () => {
		const user = await factory.create('User', {
			password: '123123123',
		})

		const compareHash = await user.checkPassword('123123123')

		expect(compareHash).toBe(true)
	})

	// Update a user

	it('should be able to update a user name', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				name: 'Felipe Lima',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.body.name).toBe('Felipe Lima')
	})

	it('should be able to update a user email', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				email: 'felipe@monts.com.br',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.body.email).toBe('felipe@monts.com.br')
	})

	it('should be able to update a user password', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				oldPassword: user.password,
				password: '123123123',
				confirmPassword: '123123123',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.status).toBe(200)
	})

	it('should not be able to update a user password invalid', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				oldPassword: 'asdasdasdasd',
				password: '123123123',
				confirmPassword: '123123123',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.status).toBe(401)
	})

	it('should not be able to update a user email with duplicated email', async () => {
		await factory.create('User', { email: 'felipe@monts.com.br' })
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				email: 'felipe@monts.com.br',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.status).toBe(401)
	})

	it('should not be able to update a user email without confirmPassword', async () => {
		const user = (await factory.create('User')).dataValues

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const updateResponse = await request(app)
			.put('/api/users')
			.send({
				oldPassword: user.password,
				password: '123123123',
			})
			.set('Authorization', `Bearer ${token}`)

		expect(updateResponse.status).toBe(400)
	})
})
