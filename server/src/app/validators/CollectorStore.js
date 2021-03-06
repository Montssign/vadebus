import * as Yup from 'yup'
import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	try {
		const schema = Yup.object().shape({
			name: Yup.string().min(3).required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
			role: Yup.string().oneOf(['driver', 'collector']).required(),
			login: Yup.string().required(),
			phone: Yup.string().required(),
			cpfOrCnpj: Yup.string().required(),
		})

		await schema.validate(req.body, { abortEarly: false })

		return next()
	} catch (err) {
		throw new Exception({
			status: 400,
			message: 'Validation fails',
			data: err.inner,
		})
	}
}
