#!/bin/bash
DIR="./venv/"

if [ -d "$DIR" ]; then
  echo "Directory '$DIR' exists."
else
  echo "Directory '$DIR' does not exist."
  python3 -m venv venv
fi

source ./venv/bin/activate
cd ./backend/
flask --app main run --debug
