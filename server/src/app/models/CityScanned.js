import Sequelize, { Model } from 'sequelize'

class CityScanned extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				cityQuery: Sequelize.STRING,
			},
			{
				sequelize,
				paranoid: true,
			}
		)

		return this
	}

	static associate(models) {
		this.hasMany(models.BusStation, {
			foreignKey: 'cityScannedId',
			as: 'busStations',
		})
		this.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy' })
	}
}

export default CityScanned
