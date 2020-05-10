module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'avatarId', {
			type: Sequelize.UUID,
			references: { model: 'Files', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: true,
		})
	},

	down: (queryInterface) => {
		return queryInterface.removeColumn('Users', 'avatarId')
	},
}
