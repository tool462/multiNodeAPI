# How to install multiNodeBot

## Pre-requisites
 
### Git

`cd ~`

`sudo apt-get install git`

### Node.js

Login to your server that you want to use to monitore your Onz servers

`cd ~`

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

## Install multiNodeAPI

  Login to your onz server that you want to monitore

 `git clone https://github.com/tool462/multiNodeAPI.git`
 
 `cd multiNodeAPI`
 
 `npm install`
 
 `cp src/config_mainnet.js src/config.js`
