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
        # 1) check if the rerun file is present
        if [ ! -f $RERUN_FILE_PATH ]; then 
             # 2) if the file is not present exit the script
            echo "No failures have been detected: exiting!"
            exit 0
        else
            echo "Failures have been detected: rerunning the failed tests!"
            TRY_COUNTER=`expr $TRY_COUNTER + 1`;       
            echo "Rerun failed tests try: $TRY_COUNTER"
            # 3) get command from the file
            FAILED_TAGS=$(cat $RERUN_FILE_PATH)
            # 4) add tags to command and execute
            printf "\n"
            RERUN_COMMAND=$(cat $RERUN_FILE_PATH | grep protractor)
            eval "$RERUN_COMMAND"   
        fi        
    done
}

rerunFailedTests

# 5) if the script has not exited in the while loop not all tests have passed
echo "Not all tests have passed after $TRY_COUNTER retries.."
exit 1