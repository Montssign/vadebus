import * as Yup from 'yup'
import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	try {
		const schema = Yup.object().shape({
			name: Yup.string().min(3),
			email: Yup.string().email(),
			password: Yup.string().min(6),
			role: Yup.string().oneOf(['driver', 'collector']),
			login: Yup.string(),
			phone: Yup.string(),
			cpfOrCnpj: Yup.string(),
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
