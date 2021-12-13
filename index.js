const mysql = require('mysql')
const fs = require('fs')

const con = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "mydb"
})

const filename = "data.json"
let tableDataJSON = ''

con.connect((err) => {
	if (err) {
		throw err
	}
	console.log("Connected!")
	const values = [
		['Jo', '1231 Fake street'],
		['No', '2123 Fake street'],
		['Ao', '1233 Fake street'],
		['To', '1243 Fake street']
	]
	let sql = "CREATE DATABASE mydb"
	sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))"
	sql = "INSERT INTO customers (name, address) VALUES ?"
	sql = "SELECT * FROM customers"
	con.query(sql, (err, res, fields) => {
		if (err) {
			throw err
		}
		console.log("Result: " + JSON.stringify(res))
		tableDataJSON = JSON.stringify(res)
		fs.writeFile(filename, tableDataJSON, { flag: 'w+'}, err => {
			if (err) {
				console.error(err)
				return
			}
			console.log('worked!');
		})
	})
})


setTimeout(() => {
	con.end()
}, 2000)