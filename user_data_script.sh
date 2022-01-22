#!/bin/bash -ex
# output user data logs into a separate file for debugging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
# START
echo "Setting up NodeJS Environment"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
echo 'export NVM_DIR="/home/ec2-user/.nvm"' >> /home/ec2-usr/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> /home/ec2-user/.bashrc
# Dot source the files to ensure that variables are available within the current shell
. /home/ec2-user/.nvm/nvm.sh
. /home/ec2-user/.bashrc
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
#install node module
npm install
# start the app
node app.js > app.out.log 2> app.err.log < /dev/null &