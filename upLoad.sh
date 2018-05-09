# !/bin/bash
scp -r ./admin wp:/home/admin/webapp/
scp -r ./build wp:/home/admin/webapp/
scp -r ./css wp:/home/admin/webapp/
# scp -r ./images wp:/home/admin/webapp/
scp -r ./public wp:/home/admin/webapp/
scp -r ./scripts wp:/home/admin/webapp/
scp  ./index.js wp:/home/admin/webapp/index.js
# ssh wp 'node /home/admin/webapp/index.js'