module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('CityScanneds', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
			},
			cityQuery: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdById: {
				type: Sequelize.UUID,
				allowNull: true,
				references: { model: 'Users', key: 'id' },
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deletedAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		})
	},

	down: (queryInterface) => {
		return queryInterface.dropTable('CityScanneds')
	},
}
