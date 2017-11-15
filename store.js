const StoreModule = (function(){
	const mysql = require ("mysql");
	const inquirer = require ("inquirer");
	const table = require ("obj-array-table");
	function Store(){
		const that = this;
		this.connection = mysql.createConnection({
			host: "localhost",
			port: 3306,
			user: "root",
			password: process.env.MYSQL_PASSWORD,
			database: "bamazon"
		})
		this.displayInventory = function(callback){
			this.connection.query("SELECT * FROM products", function (error, results){
				if (error){
					throw error;
				}
				process.stdout.write('\033c');
				console.log(table.format(results));
				if(callback){
					return callback()
				}
				return that.connection.end();

			});
		}
		this.chooseItem = function(callback){
			inquirer.prompt({
				type: "input",
				message: "Enter the item id of the product you would like to purchase:",
				name: "selectedItem"
			}).then(function (answers){
				console.log("you have chosen:", answers.selectedItem);
				if (callback){
					callback(answers.selectedItem);
				}
				return that.connection.end();
			});
		}
		this.quantity = function(selectedItem, callback){
			inquirer.prompt({
				type: "input",
				message: "How many units would you like?", 
				name: "quantity"
			}).then(function(error, results){
				if(error){
					throw error;
				}
				console.log(`You have requested` ${results.quantity} `units of` ${selectedItem}`.`);
			});
			return that.connection.end();
		}

		
	}
	return {Store: Store}
})();

let s = new StoreModule.Store();
s.displayInventory(s.chooseItem);
// s.chooseItem();
process.exports = StoreModule;
