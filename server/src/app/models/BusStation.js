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
				placeTypes: Sequelize.VIRTUAL,
				lat: Sequelize.STRING(20),
				lng: Sequelize.STRING(20),
			},
			{
				sequelize,
			}
		)

		this.addHook('beforeSave', (station) => {
			if (station) {
				if (typeof station.placeTypes === 'object') {
					station.types = JSON.stringify(station.placeTypes)
				}
			}
		})

		this.addHook('afterFind', (station) => {
			if (station) {
				station.placeTypes = JSON.parse(station.types || [])
			}
		})

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
