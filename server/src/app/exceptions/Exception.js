const INITIAL_DATA = {
	message: 'Server internal error',
	status: 500,
	name: null,
	data: [],
}

class Exception extends Error {
	constructor(payload = INITIAL_DATA) {
		const { message, status, data } = payload
		let { name } = payload

		if (!name) {
			if (status === 500) {
				name = 'Internal Server Error'
			} else if (status === 400) {
				name = 'Bad Request'
			} else if (status === 401) {
				name = 'Unauthorized'
			} else if (status === 404) {
				name = 'Not Found'
			}
		}

		super(message)

		this.name = name
		this.status = status
		this.data = data
	}
}

export default Exception
