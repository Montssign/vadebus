import database from '../../src/database'
import AclRole from '../../src/app/models/AclRole'

export default async function truncate() {
	await Promise.all(
		Object.keys(database.connection.models).map((key) => {
			return database.connection.models[key].destroy({
				truncate: true,
				force: true,
			})
		})
	)

	await AclRole.create({
		name: 'admin',
		description: 'O Administrador do sistema, que pode fazer tudo',
	})

	await AclRole.create({
		name: 'client',
		description: 'O cliente, com funções limitadas',
	})
}
