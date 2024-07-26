// seed.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { urlDb } = require('./app/config')

// Connect ke MongoDB
mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// Handle error
db.on('error', console.error.bind(console, 'connection error:'))

// Log when connected
db.once('open', () => {
	console.log('Connected to MongoDB')

	async function seedCollection(collectionName, filePath) {
		try {
			const data = fs.readFileSync(filePath, 'utf8')
			const jsonData = JSON.parse(data)

			const collection = db.collection(collectionName)
			const result = await collection.insertMany(jsonData)
			console.log(`${collectionName} imported successfully`, result)
		} catch (err) {
			console.error(`Error importing ${collectionName}:`, err.message)
		}
	}

	async function seedDatabase() {
		await seedCollection(
			'customers',
			path.join(__dirname, 'app', 'mock', 'customers.json')
		)
		await seedCollection(
			'products',
			path.join(__dirname, 'app', 'mock', 'products.json')
		)
		await seedCollection(
			'users',
			path.join(__dirname, 'app', 'mock', 'users.json')
		)

		// Close the connection after seeding
		mongoose.connection.close(() => {
			console.log('Database seeding complete. Connection closed.')
			process.exit(0)
		})
	}

	seedDatabase()
})
