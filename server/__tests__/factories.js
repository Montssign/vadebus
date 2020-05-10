import faker from 'faker'
import { factory } from 'factory-girl'

import User from '../src/app/models/User'
import Notification from '../src/app/schemas/Notification'

factory.define('User', User, {
	name: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
})

factory.define('Notification', Notification, {
	content: faker.random.words,
	user: faker.random.uuid,
})

export default factory
