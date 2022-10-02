#!/bin/bash
# node ./prepare/sitemap/index.js
# node ./prepare/robot.js
sudo sshfs -o allow_other,default_permissions,IdentityFile=/home/serj/.ssh/id_rsa user@46.101.168.74:/ /mnt/prod
echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
VAR1="/build/*"
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )${VAR1}"
# rm -rf /mnt/prod/home/user/project/translates_front/*
echo -ne '#######################   (70%)\r'
cp -r $SCRIPTPATH  /mnt/prod/home/user/project/translates_front
echo -ne '#######################   (100%)\r'
sudo fusermount -u  /mnt/prod
echo -ne '\n'
