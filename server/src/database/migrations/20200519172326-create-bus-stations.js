module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('BusStations', {
			id: {
				type: Sequelize.STRING,
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			placeId: {
				type: Sequelize.STRING,
			},
			types: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			lat: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			lng: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			cityScannedId: {
				type: Sequelize.UUID,
				references: { model: 'CityScanneds', key: 'id' },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	down: (queryInterface) => {
		return queryInterface.dropTable('BusStations')
	},
}
