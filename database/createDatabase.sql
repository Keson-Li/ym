DROP DATABASE yomall;
CREATE DATABASE yomall;
DELETE FROM mysql.user WHERE user='yomall_admin';
FLUSH PRIVILEGES;
CREATE USER yomall_admin@localhost IDENTIFIED BY 'yomall';
GRANT ALL PRIVILEGES ON yomall.* TO yomall_admin;
commit;
FLUSH PRIVILEGES;