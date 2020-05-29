import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import databaseConfig from '../configs/database'

import User from '../app/models/User'
import File from '../app/models/File'
import AclRole from '../app/models/AclRole'
import Company from '../app/models/Company'
import Car from '../app/models/Car'
import Route from '../app/models/Route'
import Point from '../app/models/Point'
import CityScanned from '../app/models/CityScanned'
import BusStation from '../app/models/BusStation'
import Address from '../app/models/Address'

const models = [
	User,
	File,
	AclRole,
	Company,
	Car,
	Route,
	Point,
	CityScanned,
	BusStation,
	Address,
]

class Database {
	constructor() {
		this.init()
		this.mongo()
	}

	init() {
		this.connection = new Sequelize(databaseConfig)

		models.map((model) => model.init(this.connection))
		models.map(
			(model) => model.associate && model.associate(this.connection.models)
		)
	}

	mongo() {
		this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		})
	}
}

export default new Database()
