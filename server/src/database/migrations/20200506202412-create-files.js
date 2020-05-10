module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Files', {
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
			path: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			mimetype: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.ENUM(['avatar', 'background', 'file']),
				defaultValue: 'avatar',
				allowNull: false,
			},
			ownerId: {
				type: Sequelize.UUID,
				allowNull: true,
				references: { model: 'Users', key: 'id' },
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			size: {
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable('Files')
	},
}
