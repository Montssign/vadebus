module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('AclRoleUser', {
			userId: {
				type: Sequelize.UUID,
				references: { model: 'Users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			roleId: {
				type: Sequelize.UUID,
				references: { model: 'AclRoles', key: 'id' },
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
		return queryInterface.dropTable('AclRoleUser')
	},
}
