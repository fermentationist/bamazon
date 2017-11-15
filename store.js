const StoreModule = (function(){
	console.log("*StoreModule imported.\n");
	const mysql = require ("mysql");
	const inquirer = require ("inquirer");
	const table = require ("obj-array-table");
	function Store(){
		const that = this;
		this.tab = 0;
		this.inventorySnapshot;
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
				console.log("\nYour Total Bill: " + that.tab.toFixed(2) + "\n");
				that.inventorySnapshot = results;
				if(callback){
					return callback()
				}
				// return that.connection.end();

			});
		}
		this.lookupItem = function(inventoryArray, itemId){
			let item = null;
			inventoryArray.forEach(function(product){
				if (product.item_id === parseInt(itemId)){
					item = product;
				}
			});
			return item;
		}

		this.chooseItem = function(callback){
			let item, itemNum;
			inquirer.prompt({
				type: "input",
				message: "Enter the item id of the product:",
				name: "selectedItem"
			}).then(function (answers){
				itemNum = answers.selectedItem;
				item = that.lookupItem(that.inventorySnapshot, itemNum);
				if (item && item.stock_quantity > 0){
					return that.chooseQuantity(item, callback);
				}else if (item){
					console.log("\nThere is none of that item in stock. Please choose again.\n");
					return that.chooseItem(callback);
				}else{
					console.log("\nInvalid item id number. Please choose again.\n");
					return that.chooseItem(callback);
				}
			});
		}

		this.chooseQuantity = function(item, callback){
			let amount;
			const itemName = item.product_name;
			inquirer.prompt({
				type: "input",
				message: "Enter the quantity:",
				name: "quantity"
			}).then(function(answers){
				amount = answers.quantity;
				//console.log(`\nYou have requested ${amount} of ${itemName}`);
				if(amount > item.stock_quantity){
					console.log("\nNot enough in stock. Please choose again.\n");
					return that.chooseQuantity(item, callback);
				}
				if(callback){
					return that.placeOrder(item, amount, callback);
				}
				return that.connection.end();
			});
		}

		this.placeOrder = function(item, quantity, callback){
			const itemId = item.item_id;
			const newQuantity = item.stock_quantity - quantity;
			const queryString = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemId}`;
			that.connection.query(queryString, function(error, results){
				if(error){
					throw error;
				}
				console.log(`Successfully placed order for ${quantity} ${item.product_name}.`);
				const cost = item.price * parseFloat(quantity);
				that.tab += cost;
				console.log("Cost:", cost);
				setTimeout(function(){
					if (callback){
						return that.displayInventory(callback);
					}
					return;
				},3000);
			});
		}


		
	}
	return {Store: Store};
})();

module.exports = StoreModule;
