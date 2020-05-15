module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('CarRoute', {
			routeId: {
				type: Sequelize.UUID,
				references: { model: 'Routes', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			carId: {
				type: Sequelize.UUID,
				references: { model: 'Cars', key: 'id' },
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
		return queryInterface.dropTable('CarRoute')
	},
}
