/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker')

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(
			'AclRoles',
			[
				{
					id: faker.random.uuid(),
					name: 'admin',
					description: 'O Administrador do sistema, que pode fazer tudo',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: faker.random.uuid(),
					name: 'manager',
					description: 'O Gerente do sistema, quem controla tudo da empresa',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: faker.random.uuid(),
					name: 'employee',
					description: 'O funcionário que verifica e modifica poucos dados',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: faker.random.uuid(),
					name: 'driver',
					description: 'O motorista',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: faker.random.uuid(),
					name: 'collector',
					description: 'O cobrador',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: faker.random.uuid(),
					name: 'client',
					description: 'O cliente, com funções limitadas',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('AclRoles', null, {})
	},
}
