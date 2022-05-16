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


# install mysql
echo -e "${YELLOW}Install Mysql${CLEAR}"
export DEBIAN_FRONTEND="noninteractive"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password root"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root"
sudo apt-get install -y mysql-server
# sudo mysql_secure_installation

# install project
echo -e "${YELLOW}Install Project End${CLEAR}"
npm --prefix ./refrigerator_label_back/ install

echo -e "${YELLOW}Install Project Front${CLEAR}"
npm --prefix ./refrigerator_label_front/ install

# sequelize
echo -e "${YELLOW}Sequelize set${CLEAR}"
cd refrigerator_label_back
npx sequelize db:migrate
npx sequelize db:seed:all
cd ..

#.env
echo -e "${YELLOW}End .env Create${CLEAR}"
cd refrigerator_label_back
cat <<\EOF >.env
PORT=''
APP_ENV='development'
TIMEZONE='Asia/Taipei'

NODEMAILER_USER=''
NODEMAILER_PASSWORD=''

SUPER_USER_USERNAME='root'
SUPER_USER_PASSWORD='root'
SUPER_USER_MAIL='root@gmail.com'

JWT_SECRET='thisismynewproject'

DB_USERNAME='bxlsmntsiebcmo'
DB_PASSWORD='85cc654c57930209472966827528fc5cf6b97120069ce9e9ff3a418487c77335'
DB_DATABASE='dam55h25c79f8h'
DB_HOST='ec2-35-168-194-15.compute-1.amazonaws.com'
DB_PORT='5432'
DB_DIALECT='postgres'
EOF
cd ..
echo -e "${YELLOW}Front .env Create${CLEAR}"
cd refrigerator_label_front
cat <<\EOF >.env
REACT_APP_BACK_END='http://localhost:3000/'
EOF
cd ..
# start project
echo -e "${YELLOW}Start Project${CLEAR}"
npm --prefix ./refrigerator_label_back/ run start & npm --prefix ./refrigerator_label_front/ run start


