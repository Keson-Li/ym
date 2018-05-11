#!/bin/bash
yum install -y mairadb mariadb-server nodejs

systemctl enable mariadb
systemctl start mariadb 
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent

mkdir /home/admin/yomall

chown admin:admin /home/admin/yomall

mkdir /home/admin/webapp
cd /home/admin/webapp
npm init
sudo npm install body-parser express express-session jquery webpack mariasql --save

reboot