#!/bin/bash
# output user data logs into a separate file for debugging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
# download nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# source nvm
. /.nvm/nvm.sh
# export NVM dir
cat <<EOF >> /home/ec2-user/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF
# install node
nvm install node
#upgrade yum
sudo yum upgrade
#install git
sudo yum install git -y
cd /home/ec2-user
# get source code from githubt
git clone https://github.com/jkeane889/aws_auto_scale_nodeJS
#get in project dir
cd aws_auto_scale_nodeJS
#give permission
sudo chmod -R 755 .
#install node modules for server
npm install
# navigate to frontend code
cd app/
# install node modules for client
npm install
# generate build folder for application
npm run build
# navigate back to server
cd ..
# start the app
node app.js > app.out.log 2> app.err.log < /dev/null &