const mysql = require('mysql')

const con = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: ""
})

con.connect((err) => {
	if (err) {
		throw err
	}
	console.log("Connected!")
	const sql = "CREATE DATABASE mydb"
	con.query(sql, (err, res) => {
		if (err) {
			throw err
		}
		console.log("Result: " + res)
	})
})