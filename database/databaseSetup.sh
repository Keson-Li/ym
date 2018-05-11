#!/bin/bash
systemctl restart mariadb
mysql -u yomall_admin -p yomall < ./databaseSetup.sql