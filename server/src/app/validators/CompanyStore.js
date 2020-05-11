import * as Yup from 'yup'
import Exception from '../exceptions/Exception'

export default async (req, res, next) => {
	try {
		const schema = Yup.object().shape({
			company: Yup.object()
				.shape({
					name: Yup.string().required(),
					companyName: Yup.string().required(),
					address: Yup.string().required(),
					email: Yup.string().email(),
					phone: Yup.string().required(),
					cnpj: Yup.string().max(14).required(),
				})
				.required(),
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
