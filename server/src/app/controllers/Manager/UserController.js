import UpdateUserService from '../../services/UpdateUserService'
import Company from '../../models/Company'
import CreateUserService from '../../services/CreateUserService'
import Exception from '../../exceptions/Exception'

class UserController {
	async store(req, res) {
		const reqCompany = req.body.company
		delete req.body.company

		const user = await CreateUserService.run({
			userData: { ...req.body, cpfOrCnpj: reqCompany.cnpj },
			role: 'manager',
		})

		try {
			const company = await Company.create({
				...reqCompany,
				email: reqCompany.email || user.email,
				phone: reqCompany.phone || user.phone,
			})

			user.companyId = company.id
			await user.save()
		} catch (err) {
			user.destroy({ force: true })

			throw new Exception({ status: 500 })
		}

		const { id, name, email, roles } = user

		return res.status(201).json({ id, name, email, roles })
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
