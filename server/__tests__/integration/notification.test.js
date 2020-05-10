import request from 'supertest'

import app from '../../src/app'
import truncate from '../util/truncate'
import factory from '../factories'

describe('Notification', () => {
	beforeEach(async () => {
		await truncate()
	})

	it('should be able to list user notifications', async () => {
		const user = await factory.attrs('User')
		const userResponse = await request(app).post('/api/users').send(user)
		const { id } = userResponse.body

		await factory.createMany('Notification', 30, { user: id })

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const notificationsResponse = await request(app)
			.get('/api/notifications')
			.set('Authorization', `Bearer ${token}`)

		expect(notificationsResponse.body[0]).toHaveProperty('_id')
		expect(notificationsResponse.body.length).toBe(20)
	})

	it('should be able to update notification to read', async () => {
		const user = await factory.attrs('User')
		await request(app).post('/api/users').send(user)

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body

		const notificationsResponse = await request(app)
			.get('/api/notifications')
			.set('Authorization', `Bearer ${token}`)

		// eslint-disable-next-line no-underscore-dangle
		const id = notificationsResponse.body[0]._id

		const notificationResponse = await request(app)
			.put(`/api/notifications/${id}`)
			.set('Authorization', `Bearer ${token}`)

		expect(notificationResponse.body.read).toBe(true)
	})
})
