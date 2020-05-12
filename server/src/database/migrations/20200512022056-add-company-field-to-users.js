module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'companyId', {
			type: Sequelize.UUID,
			references: { model: 'Companies', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
			allowNull: true,
		})
	},

	down: (queryInterface) => {
		return queryInterface.removeColumn('Users', 'companyId')
	},
}
