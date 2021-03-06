import Sequelize, { Model } from 'sequelize'

class Route extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				estimatedTime: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' })
		this.hasMany(models.Point, {
			foreignKey: 'routeId',
			as: 'points',
		})

		this.belongsToMany(models.User, {
			through: 'CollectorRoute',
			foreignKey: 'routeId',
			as: 'collectors',
		})

		this.belongsToMany(models.Car, {
			through: 'CarRoute',
			foreignKey: 'routeId',
			as: 'cars',
		})
	}
}

export default Route
