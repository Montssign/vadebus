import Sequelize, { Model } from 'sequelize'

class Car extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				brand: Sequelize.STRING,
				plate: Sequelize.STRING,
				number: Sequelize.STRING,
				seats: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' })

		this.belongsToMany(models.Route, {
			through: 'CarRoute',
			foreignKey: 'carId',
			as: 'routes',
		})
	}
}

export default Car
