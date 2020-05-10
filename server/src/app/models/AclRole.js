import Sequelize, { Model } from 'sequelize'

class AclRole extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				description: Sequelize.STRING,
			},
			{
				sequelize,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'AclRoleUser',
			foreignKey: 'roleId',
			as: 'users',
		})
	}
}

export default AclRole
