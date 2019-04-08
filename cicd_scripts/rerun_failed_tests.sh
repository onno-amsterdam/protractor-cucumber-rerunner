#!/usr/bin/env bash

# set variables: 
NUM_OF_RETRIES=${1:-'5'}
TRY_COUNTER=0
RERUN_FILE_PATH="./rerun-command/rerun_command.txt" 
RERUN_COMMAND=

printf "\n"
echo "================== Rerun failed flaky tests ====================="

function rerunFailedTests {
    
    while ([ $TRY_COUNTER -lt "$NUM_OF_RETRIES" ])
    do  
        echo "Checking if there are failed tests......"
        if [ ! -f $RERUN_FILE_PATH ]; then 
            echo "No failures have been detected: exiting!"
            exit
        else
            echo "Failures have been detected: rerunning the failed tests!"
            printf "\n"
            RERUN_COMMAND=$(cat $RERUN_FILE_PATH | grep protractor)
            eval "$RERUN_COMMAND"   
            TRY_COUNTER=`expr $TRY_COUNTER + 1`;       
        fi        
    done
}

rerunFailedTests