# !/bin/bash

# Text Color Variables
GREEN='\033[32m'  # Green
YELLOW='\033[33m' # YELLOW
CLEAR='\033[0m'   # Clear color and formatting


echo -e "${GREEN}Start Install Label Management System...${CLEAR}"

sudo apt-get -y update

# install node.js
echo -e "${YELLOW}Install Node.js${CLEAR}"
sudo apt-get install -y nodejs
node -v

# install npm
echo -e "${YELLOW}Install Npm${CLEAR}"
sudo apt-get install -y npm
npm -v

# install project
echo -e "${YELLOW}Install Project End${CLEAR}"
cd refrigerator_label_back
npm install

echo -e "${YELLOW}Install Project Front${CLEAR}"
cd refrigerator_label_front
npm install

# start it
npm --prefix ./refrigerator_label_back/ run start &&
npm --prefix ./refrigerator_label_front/ run start


