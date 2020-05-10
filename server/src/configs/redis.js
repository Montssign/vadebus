export default {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	keyPrefix: `${process.env.REDIS_PREFIX}:`,
	prefix: `${process.env.REDIS_PREFIX}:`,
}
