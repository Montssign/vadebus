import Sequelize, { Model } from 'sequelize'

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				mimetype: Sequelize.STRING,
				type: Sequelize.ENUM(['avatar', 'background', 'file']),
				size: Sequelize.INTEGER,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `${process.env.APP_URL}/files/${this.path}`
					},
				},
			},
			{
				sequelize,
			}
		)

		return this
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' })
		this.hasOne(models.User, { foreignKey: 'avatarId', as: 'user' })
	}
}

export default File
