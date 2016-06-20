#!/bin/bash

echo "_________________________"
echo "|                       |"
echo "|Author : Amanuel Bogale|"
echo "-------------------------"
echo "CONTRIBUTING PURPOSES"

echo "MAKE SURE YOU HAVE NODE AND NPM BEFORE THIS."
read -p "Continue (y/n)?" choice
case "$choice" in 
  y|Y ) 
  npm install
  npm install bower -g
  bower install
  npm install gulp -g
  gulp watch
  ;;
  n|N ) echo "Exiting...";;
  * ) echo "Invalid. Exiting...";;
esac

