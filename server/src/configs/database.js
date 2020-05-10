require('../bootstrap')

const databaseConfigs = {
	dialect: process.env.DB_DRIVE,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	dialectOptions: {
		useUTC: false,
	},
	timezone: '-03:00',
	define: {
		charset: 'utf8',
		dialectOptions: {
			collate: 'utf8_general_ci',
		},
		timestamps: true,
	},
}

if (process.env.DB_LOGGING === 'false') {
	databaseConfigs.logging = false
}

if (process.env.NODE_ENV === 'test') {
	databaseConfigs.storage = './__tests__/database.sqlite'
	delete databaseConfigs.timezone
	delete databaseConfigs.dialectOptions
}

module.exports = databaseConfigs
