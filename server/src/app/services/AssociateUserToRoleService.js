import Sequelize from 'sequelize'
import Exception from '../exceptions/Exception'
import AclRole from '../models/AclRole'

const INITIAL_DATA = { user: null, role: 'client' }

class AssociateUserToRoleService {
	async run(payload = INITIAL_DATA) {
		const { user, role: searchRole } = payload

		if (!user) {
			throw new Exception({ status: 500, message: 'No have user to add role' })
		}

		if (Array.isArray(searchRole)) {
			const searchRoles = searchRole.map((name) => ({ name }))

			const roles = await AclRole.findAll({
				where: Sequelize.or(...searchRoles),
			})

			await Promise.all(
				roles.map(async (role) => {
					return user.addRole(role)
				})
			)

			if (searchRole.length) {
				throw new Exception({ status: 400, message: 'Invalid role' })
			}

			return
		}

		if (!searchRole) {
			throw new Exception({ status: 400, message: 'Invalid role' })
		}

		const role = await AclRole.findOne({ where: { name: searchRole } })

		await user.addRole(role)
	}
}

export default new AssociateUserToRoleService()
