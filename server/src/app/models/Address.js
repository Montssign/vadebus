import Sequelize, { Model } from 'sequelize'

class Address extends Model {
	static init(sequelize) {
		super.init(
			{
				cep: {
					type: Sequelize.STRING,
					primaryKey: true,
				},
				city: Sequelize.STRING,
				uf: Sequelize.STRING(2),
				neighborhood: Sequelize.STRING,
				publicPlace: Sequelize.STRING,
				lat: Sequelize.DOUBLE,
				lng: Sequelize.DOUBLE,
			},
			{
				sequelize,
			}
		)

		return this
	}
}

export default Address
