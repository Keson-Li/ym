
CREATE TABLE IF NOT EXISTS auth_user (
	id	integer NOT NULL AUTO_INCREMENT,
	password	varchar ( 128 ) NOT NULL,
	last_login	datetime,
	is_superuser	bool NOT NULL DEFAULT false,
	username	varchar ( 150 ) NOT NULL UNIQUE,
	first_name	varchar ( 30 ) NOT NULL,
	email	varchar ( 254 ) NOT NULL,
	is_staff	bool NOT NULL DEFAULT false,
	is_active	bool NOT NULL DEFAULT true,
	date_joined	TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
	last_name	varchar ( 150 ) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;

-- CREATE
--     TRIGGER `auth_user_trigger` after INSERT ON `auth_user` 
--     FOR EACH ROW BEGIN
--       SET NEW.date_joined = NOW();
-- END;

                                        
CREATE TABLE IF NOT EXISTS catagory (
	id		integer NOT NULL AUTO_INCREMENT,
    name	varchar ( 30 ) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;
                                            
CREATE TABLE IF NOT EXISTS product (
	id	integer NOT NULL AUTO_INCREMENT,
	img varchar ( 30 ),
    name	varchar ( 50 ) NOT NULL,
	title	varchar ( 30 ) NOT NULL,
	origin_place	varchar ( 30 ) NOT NULL,
	description	varchar ( 254 ) NOT NULL,
	catagory_id	integer,
    price	float,
    origin_price	float,
	is_active	bool NOT NULL DEFAULT false,
	is_popular	bool NOT NULL DEFAULT false,		-- 人气榜单
	is_newMan	bool NOT NULL DEFAULT false, 		-- 新人福利社
	is_newUpdated	bool NOT NULL DEFAULT false,    -- 四月更新
    is_promoting	bool NOT NULL DEFAULT false, 	-- 当红牛市 赶紧入市/ 单品推广
	is_heat	bool NOT NULL DEFAULT false, 			-- 今日疯抢
	is_own	bool NOT NULL DEFAULT true,				-- 自营
	is_event_sale	bool NOT NULL DEFAULT false,	-- 节日推广
	PRIMARY KEY (id),
	CONSTRAINT unique_product_name UNIQUE (name),
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

CREATE TABLE IF NOT EXISTS promote_group (  -- 当红牛市 赶紧入市/ 单品推广
	id	integer NOT NULL AUTO_INCREMENT,
	productID	integer NOT NULL,
	is_active	bool NOT NULL DEFAULT false,
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

CREATE TABLE IF NOT EXISTS promote_type (  -- 节日推广
	id	integer NOT NULL AUTO_INCREMENT,
    reason	varchar ( 50 ) NOT NULL,
	allProductID	varchar ( 1000 ) NOT NULL, -- including all promoting products's id
	is_active	bool NOT NULL DEFAULT false,
    price	integer NOT NULL,
    expired_date	datetime NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;