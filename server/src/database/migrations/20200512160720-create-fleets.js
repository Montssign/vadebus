module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Fleets', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			plate: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			seats: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
		return queryInterface.dropTable('Fleets')
	},
}
