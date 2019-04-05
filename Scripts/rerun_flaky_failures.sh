#!/usr/bin/env bash

# set variables: 
NUM_OF_RETRIES=${1:-'5'}
RERUN_FILE= 
RERUN_COMMAND=

# Do for n times: 
# 1) check if rerun file is there; 
# 2) if rerun file is there, read the command; 
# 3) execute the command; 