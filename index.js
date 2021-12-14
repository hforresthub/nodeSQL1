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
	const adr = '1231 Fake street'
	const adr2 = '1233 Fake street'
	const name = 'To'
	let sql = "CREATE DATABASE mydb"
	// sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))"
	// sql = "INSERT INTO customers (name, address) VALUES ?"
	// sql = "SELECT * FROM customers"
	// sql = "SELECT * FROM customers WHERE address = '1231 Fake street'"
	// sql = "SELECT * FROM customers WHERE address LIKE '%Fake%'"
	// sql = "SELECT * FROM customers WHERE address = " + mysql.escape(adr)
	// sql = "SELECT * FROM customers WHERE address = ? OR address = ? OR name = ?"
	sql = "SELECT name, address FROM customers WHERE address = ? OR address = ? OR name = ?"
	con.query(sql, [adr, adr2, name], (err, res, fields) => {
		if (err) {
			throw err
		}
		tableDataJSON = JSON.stringify(res[0].name)
		console.log(`Result: ${tableDataJSON}`)
		console.log(`Fields: `, fields[1].name)
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