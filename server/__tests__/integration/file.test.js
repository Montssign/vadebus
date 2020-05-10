import request from 'supertest'
import { resolve } from 'path'
import fs from 'fs'

import app from '../../src/app'
import truncate from '../util/truncate'
import factory from '../factories'

const deleteFiles = (path) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const test = /_test_\./g
			if (test.test(file)) {
				const curPath = resolve(path, file)
				fs.unlinkSync(curPath)
			}
		})
	}
}

describe('Files', () => {
	beforeEach(async () => {
		await truncate()
	})

	afterEach(async () => {
		const path = resolve(__dirname, '..', '..', 'tmp', 'uploads')
		deleteFiles(path)
	})

	it('should be store file', async () => {
		const user = await factory.attrs('User')
		await request(app).post('/api/users').send(user)

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body
		const filePath = resolve(__dirname, '..', 'testFiles', 'data-trends.svg')

		const fileResponse = await request(app)
			.post('/api/files')
			.attach('file', filePath)
			.set('Authorization', `Bearer ${token}`)

		expect(fileResponse.body[0]).toHaveProperty('id')
	})

	it('should be store file with type background and list then', async () => {
		const user = await factory.attrs('User')
		await request(app).post('/api/users').send(user)

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body
		const filePath = resolve(__dirname, '..', 'testFiles', 'data-trends.svg')

		await request(app)
			.post('/api/files')
			.field('type', 'background')
			.attach('file', filePath)
			.set('Authorization', `Bearer ${token}`)

		const filesResponse = await request(app)
			.get('/api/files')
			.query({ type: 'background' })
			.set('Authorization', `Bearer ${token}`)

		expect(filesResponse.body[0].type).toBe('background')
		expect(filesResponse.body.length).toBe(1)
	})

	it('should be store file with type background and list then', async () => {
		const user = await factory.attrs('User')
		await request(app).post('/api/users').send(user)

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body
		const filePath = resolve(__dirname, '..', 'testFiles', 'data-trends.svg')

		await request(app)
			.post('/api/files')
			.field('type', 'background')
			.attach('file', filePath)
			.set('Authorization', `Bearer ${token}`)

		const filesResponse = await request(app)
			.get('/api/files')
			.query({ isPublic: true })
			.set('Authorization', `Bearer ${token}`)

		expect(filesResponse.body.length).toBe(0)
	})

	it('should be store many files and list then', async () => {
		const user = await factory.attrs('User')
		await request(app).post('/api/users').send(user)

		const sessionResponse = await request(app).post('/api/sessions').send(user)
		const { token } = sessionResponse.body
		const filePath = resolve(__dirname, '..', 'testFiles', 'data-trends.svg')

		await request(app)
			.post('/api/files')
			.attach('file', filePath)
			.attach('file', filePath)
			.attach('file', filePath)
			.attach('file', filePath)
			.attach('file', filePath)
			.set('Authorization', `Bearer ${token}`)

		const filesResponse = await request(app)
			.get('/api/files')
			.set('Authorization', `Bearer ${token}`)

		expect(filesResponse.body.length).toBe(5)
	})
})
