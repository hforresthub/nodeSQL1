const mysql = require('mysql')

const con = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "mydb"
})

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
	})
})

setTimeout(() => {
	con.end()
}, 2000)