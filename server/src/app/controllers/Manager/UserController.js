import UpdateUserService from '../../services/UpdateUserService'
import Company from '../../models/Company'
import CreateUserService from '../../services/CreateUserService'
import User from '../../models/User'
import Exception from '../../exceptions/Exception'

class UserController {
	async store(req, res) {
		const user = await CreateUserService.run({
			userData: req.body,
			role: 'manager',
		})

		const addUser = await User.findByPk(user.id)

		const company = await Company.create({
			...req.body.company,
			email: user.email,
		})

		if (!company) {
			await addUser.destroy({ force: true })
			throw new Exception({ status: 500 })
		}

		company.addUser(addUser)

		user.company = {
			id: company.id,
			email: company.email,
			phone: company.phone,
			name: company.name,
			companyName: company.companyName,
			address: company.address,
			cnpj: company.cnpj,
		}

		return res.json(user)
	}

	async update(req, res) {
		const user = await UpdateUserService.run({
			userData: req.body,
			userId: req.user.id,
		})

		return res.json(user)
	}
}

export default new UserController()
