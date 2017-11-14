create schema bamazon;
use bamazon;
create table products (
	item_id integer(20) not null auto_increment,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(15,2),
    stock_quantity integer(10),
    primary key(item_id)
)