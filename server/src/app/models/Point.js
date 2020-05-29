import Sequelize, { Model } from 'sequelize'

class Point extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				index: Sequelize.INTEGER,
				lat: Sequelize.DOUBLE,
				lng: Sequelize.DOUBLE,
			},
			{
				sequelize,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsTo(models.Route, { foreignKey: 'routeId', as: 'route' })
	}
}

export default Point
