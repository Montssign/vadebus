module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('CompanyUser', {
			userId: {
				type: Sequelize.UUID,
				references: { model: 'Users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			companyId: {
				type: Sequelize.UUID,
				references: { model: 'Companies', key: 'id' },
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
		return queryInterface.dropTable('CompanyUser')
	},
}
