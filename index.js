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
	let sql = "CREATE DATABASE mydb"
	sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))"
	sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
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