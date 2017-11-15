USE bamazon;
LOAD DATA LOCAL INFILE '/Users/fermentationist/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub/bamazon/Untitled.csv'
INTO TABLE products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
SELECT * FROM bamazon.products;
