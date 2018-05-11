
CREATE TABLE IF NOT EXISTS auth_user (
	id	integer NOT NULL AUTO_INCREMENT,
	password	varchar ( 128 ) NOT NULL,
	last_login	datetime,
	is_superuser	bool NOT NULL,
	username	varchar ( 150 ) NOT NULL UNIQUE,
	first_name	varchar ( 30 ) NOT NULL,
	email	varchar ( 254 ) NOT NULL,
	is_staff	bool NOT NULL,
	is_active	bool NOT NULL,
	date_joined	datetime NOT NULL,
	last_name	varchar ( 150 ) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;

                                        
CREATE TABLE IF NOT EXISTS catagory (
	id		integer NOT NULL AUTO_INCREMENT,
    name	varchar ( 30 ) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;
                                            
CREATE TABLE IF NOT EXISTS product (
	id	integer NOT NULL AUTO_INCREMENT,
    name	varchar ( 50 ) NOT NULL,
	title	varchar ( 30 ) NOT NULL,
	origin_place	varchar ( 30 ) NOT NULL,
	description	varchar ( 254 ) NOT NULL,
	catagory_id	integer,
    price	float,
    origin_price	float,
	is_active	bool NOT NULL,
	is_newMan	bool NOT NULL,
	is_newUpdated	bool NOT NULL,
    is_promoting	bool NOT NULL,
	is_heat	bool NOT NULL,
	is_own	bool NOT NULL,
	is_event_sale	bool NOT NULL,
	PRIMARY KEY (id),
	INDEX (catagory_id),
	FOREIGN KEY (catagory_id) 
			REFERENCES catagory(id)
			ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS comment (
	id	integer NOT NULL AUTO_INCREMENT,
    content	varchar ( 200 ) NOT NULL,
	product_id	integer NOT NULL,
	PRIMARY KEY (id),
	INDEX (product_id),
	FOREIGN KEY (product_id) REFERENCES product(id)
			ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS promote_group (
	id	integer NOT NULL AUTO_INCREMENT,
    -- reason	varchar ( 50 ) NOT NULL,
	productID	integer NOT NULL,
	is_active	bool NOT NULL,
    price	integer NOT NULL,
	start_price	integer NOT NULL,
	end_price	integer NOT NULL,
	final_quantity	integer NOT NULL,
    expired_date	datetime NOT NULL,
	PRIMARY KEY (id),
	INDEX (productID),
	FOREIGN KEY (productID) REFERENCES product(id)
		ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS promote_type (
	id	integer NOT NULL AUTO_INCREMENT,
    reason	varchar ( 50 ) NOT NULL,
	productID	integer NOT NULL,
	is_active	bool NOT NULL,
    price	integer NOT NULL,
    expired_date	datetime NOT NULL,
	PRIMARY KEY (id),
	INDEX (productID),
	FOREIGN KEY (productID) REFERENCES product(id)
		ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;


