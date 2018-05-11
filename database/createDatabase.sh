#!/bin/bash
systemctl restart mariadb
mysql -u root < ./createDatabase.sql