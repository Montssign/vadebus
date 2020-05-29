module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Addresses', {
			cep: {
				type: Sequelize.STRING,
				primaryKey: true,
				autoIncrement: false,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			uf: {
				type: Sequelize.STRING(2),
				allowNull: false,
			},
			neighborhood: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			publicPlace: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			lat: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			lng: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	down: (queryInterface) => {
		return queryInterface.dropTable('Addresses')
	},
}
