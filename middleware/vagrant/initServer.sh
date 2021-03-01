#!/bin/bash

# install dependencies
apt update
apt install -y nodejs 
apt install -y curl
curl https://www.npmjs.com/install.sh | sh
apt-get install -y git
npm install pm2 -g

# download repo
git clone https://github.com/johan-martinez/lab2.git
cd lab2/server/
npm install
sudo pm2 start index.js
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u vagrant --hp /home/vagrant
pm2 save --force