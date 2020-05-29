module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Routes', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			estimatedTime: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			companyId: {
				type: Sequelize.UUID,
				references: { model: 'Companies', key: 'id' },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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
		return queryInterface.dropTable('Routes')
	},
}
