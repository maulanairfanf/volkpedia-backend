const mongoose = require('mongoose')
const { urlDb } = require('../config')

const connectDB = async () => {
	try {
		await mongoose.connect(urlDb)
		console.log('Connected to MongoDB')
	} catch (error) {
		console.error('Connection error:', error)
		process.exit(1) // Exit process with failure
	}
}

module.exports = connectDB
