import Sequelize, { Model } from 'sequelize'

class Company extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				companyName: Sequelize.STRING,
				address: Sequelize.TEXT,
				email: Sequelize.STRING,
				phone: Sequelize.STRING,
				active: Sequelize.BOOLEAN,
			},
			{
				sequelize,
				paranoid: true,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'CompanyUser',
			foreignKey: 'companyId',
			as: 'users',
		})
	}
}

export default Company
