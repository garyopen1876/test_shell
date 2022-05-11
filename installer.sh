# !/bin/bash

# Text Color Variables
GREEN='\033[32m'  # Green
YELLOW='\033[33m' # YELLOW
CLEAR='\033[0m'   # Clear color and formatting


echo -e "${GREEN}Start Install Label Management System...${CLEAR}"

# install node.js
echo -e "${YELLOW}Install Node.js${CLEAR}"
sudo apt-get install -y nodejs
node -v

# install npm
echo -e "${YELLOW}Install Npm${CLEAR}"
sudo apt-get install npm
npm -v

# install project & run 
echo -e "${YELLOW}Install Project Front${CLEAR}"
cd ~/refrigerator_label_back
npm instal
npm instal start
echo -e "${YELLOW}Install Project End${CLEAR}"
cd ~/refrigerator_label_front
npm instal
npm instal start

