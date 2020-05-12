import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				login: Sequelize.STRING,
				phone: Sequelize.STRING(15),
				cpfOrCnpj: Sequelize.STRING(14),
				password: Sequelize.VIRTUAL,
				passwordHash: Sequelize.STRING,
			},
			{
				sequelize,
				paranoid: true,
			}
		)

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.passwordHash = await bcrypt.hash(user.password, 10)
			}
		})

		return this
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.passwordHash)
	}

	static associate(models) {
		this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'avatar' })
		this.hasMany(models.File, { foreignKey: 'ownerId', as: 'files' })
		this.belongsToMany(models.AclRole, {
			through: 'AclRoleUser',
			foreignKey: 'userId',
			as: 'roles',
		})
		this.belongsTo(models.Company, {
			foreignKey: 'companyId',
			as: 'company',
		})
	}
}

export default User
