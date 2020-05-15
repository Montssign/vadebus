module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('CollectorRoute', {
			routeId: {
				type: Sequelize.UUID,
				references: { model: 'Routes', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			collectorId: {
				type: Sequelize.UUID,
				references: { model: 'Users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
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
		return queryInterface.dropTable('CollectorRoute')
	},
}
