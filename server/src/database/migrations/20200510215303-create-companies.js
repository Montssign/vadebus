module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Companies', {
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
			companyName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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
		return queryInterface.dropTable('Companies')
	},
}
