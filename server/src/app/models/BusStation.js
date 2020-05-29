import Sequelize, { Model } from 'sequelize'

class BusStation extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.STRING,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				placeId: Sequelize.STRING,
				types: Sequelize.TEXT,
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
		this.belongsTo(models.CityScanned, {
			foreignKey: 'cityScannedId',
			as: 'city',
		})
	}
}

export default BusStation
