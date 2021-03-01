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
pm2 start index.js