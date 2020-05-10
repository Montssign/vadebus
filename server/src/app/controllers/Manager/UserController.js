import CreateUserService from '../../services/CreateUserService'
import UpdateUserService from '../../services/UpdateUserService'

class UserController {
	async store(req, res) {
		const user = await CreateUserService.run({
			userData: req.body,
			role: 'manager',
		})

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
