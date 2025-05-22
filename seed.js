// seed.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { urlDb } = require('./app/config')
const Customer = require('./app/api/v1/customer/model.js')
const Product = require('./app/api/v1/product/model.js')
const User = require('./app/api/v1/users/model.js') // perbaiki path jika foldernya 'users'

// Connect ke MongoDB
mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// Handle error
db.on('error', console.error.bind(console, 'connection error:'))

// Log when connected
db.once('open', () => {
	console.log('Connected to MongoDB')

	async function seedCollection(model, filePath) {
		try {
			const data = fs.readFileSync(filePath, 'utf8')
			const jsonData = JSON.parse(data)
			const result = await model.insertMany(jsonData, { ordered: false })
			console.log(`${model.modelName} imported successfully`, result)
		} catch (err) {
			if (
				err.code === 11000 ||
				(err.writeErrors && err.writeErrors.every(e => e.code === 11000))
			) {
				console.warn(`Some duplicates skipped in ${model.modelName}.`)
			} else {
				console.error(`Error importing ${model.modelName}:`, err.message)
			}
		}
	}

	async function seedDatabase() {
		await seedCollection(
			Customer,
			path.join(__dirname, 'app', 'mock', 'customers.json')
		)
		await seedCollection(
			Product,
			path.join(__dirname, 'app', 'mock', 'products.json')
		)
		await seedCollection(
			User,
			path.join(__dirname, 'app', 'mock', 'users.json')
		)

		// Close the connection after seeding
		await mongoose.connection.close()
		console.log('Database seeding complete. Connection closed.')
		process.exit(0)
	}

	seedDatabase()
})
