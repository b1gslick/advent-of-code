#!/bin/bash

################################################################################
# Variables                                                                         #
################################################################################
languages=("python" "ruby" "c" "c++" "rust" "java" "go" "typescript")
################################################################################
# Help                                                                         #
################################################################################
Help() {
  # Display Help
  echo "This is script for randomly choose languages for progamming"
  echo
  echo "Syntax: $1 --help"
  echo "options:"
  echo "--help, -h           Print this Help."
  echo
}

################################################################################
################################################################################
# Process the input options. Add options as needed.                            #
################################################################################
# Get the options
while [[ "$#" -gt 0 ]]; do
  case $1 in
  -h | --help)
    Help
    exit 0
    shift
    ;;
  *)
    echo "Unknown parameter passed: $1"
    exit 1
    ;;
  esac
  shift
done
# Main program                                                                 #
################################################################################
################################################################################

cat <<EOF
The winner is!
EOF

check() {
  if [[ $? -ne 0 ]]; then
    echo "$1 ended with error"
    exit $?
  fi
}

current_date_time="$(date "+%Y-%m-%d %H:%M:%S")"
size=${#languages[@]}
check "get size"
index=$(($RANDOM % $size))
check "get index"
echo $current_date_time
echo "==> ${languages[$index]}"
