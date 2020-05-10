import multer from 'multer'
import crypto from 'crypto'
import { extname, resolve } from 'path'

export default {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, res) => {
				if (err) return cb(err)
				let name = res.toString('hex')
				name += process.env.NODE_ENV === 'test' ? '_test_' : ''
				name += extname(file.originalname)
				return cb(null, name)
			})
		},
	}),
}
