import * as Yup from 'yup'
import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	try {
		const schema = Yup.object().shape({
			name: Yup.string(),
			estimatedTime: Yup.number(),
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
