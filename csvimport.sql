USE bamazon;
-- You will need to complete the file path below to this repo's location on your machine...
LOAD DATA LOCAL INFILE '/PhonyProducts.csv'
INTO TABLE products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
SELECT * FROM bamazon.products;
