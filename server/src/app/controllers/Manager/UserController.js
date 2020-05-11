import UpdateUserService from '../../services/UpdateUserService'
import Company from '../../models/Company'
import CreateUserService from '../../services/CreateUserService'
import User from '../../models/User'
import Exception from '../../exceptions/Exception'

class UserController {
	async store(req, res) {
		const reqCompany = req.body.company
		delete req.body.company

		const user = await CreateUserService.run({
			userData: { ...req.body, cpfOrCnpj: reqCompany.cnpj },
			role: 'manager',
		})

		const addUser = await User.findByPk(user.id)

		const company = await Company.create({
			...reqCompany,
			email: reqCompany.email || user.email,
			phone: reqCompany.phone || user.phone,
		})

		if (!company) {
			await addUser.destroy({ force: true })
			throw new Exception({ status: 500 })
		}

		company.addUser(addUser)

		return res.status(201).json(user)
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
