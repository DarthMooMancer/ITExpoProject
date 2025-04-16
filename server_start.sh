#!/bin/bash
DIR="./venv/"

if [ -d "$DIR" ]; then
  echo ""
  source ./venv/bin/activate
else
  echo "Directory '$DIR' does not exist."
  python3 -m venv venv
  source ./venv/bin/activate
  pip install -r ./requirements.txt
fi

flask --app main run --debug
