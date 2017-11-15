const StoreModule = require ("./store.js");

let bamazon = new StoreModule.Store();
console.log('bamazon', bamazon);


bamazon.displayInventory();
console.log("\n\nscript completed.\n\n");
