const StoreModule = require ("./store.js");
const inquirer = require ("inquirer");

const bamazon = new StoreModule.Store();

function inquire(){
	inquirer.prompt({
		type: "list",
		message: "Select an option to continue:",
		choices: ["Purchase items", "Quit"],
		name: "menuChoice"
	}).then(function(answer){
		if(answer.menuChoice === "Purchase items"){
			return bamazon.chooseItem(inquire);
		}else{
			bamazon.connection.end();
			process.stdout.write('\033c');
			return console.log("goodbye.\n\n");
		}return bamazon.displayInventory(inquire);
	});
}
bamazon.displayInventory(inquire);
console.log("\n\nscript completed.\n\n");
