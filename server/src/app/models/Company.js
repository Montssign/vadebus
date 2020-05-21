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
				fantasy: Sequelize.STRING,
				address: Sequelize.TEXT,
				email: Sequelize.STRING,
				phone: Sequelize.STRING,
				cnpj: Sequelize.STRING(14),
				active: Sequelize.BOOLEAN,
				lastSearchCity: Sequelize.STRING,
				lastSearchState: Sequelize.STRING,
			},
			{
				sequelize,
				paranoid: true,
			}
		)

		return this
	}

	static associate(models) {
		this.hasMany(models.User, {
			foreignKey: 'companyId',
			as: 'users',
		})
		this.hasMany(models.Car, { foreignKey: 'companyId', as: 'cars' })
	}
}

export default Company
