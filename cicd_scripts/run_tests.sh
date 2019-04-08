#!/usr/bin/env bash

function runTests {
    printf "\n"
    echo "======================== Run E2E tests =========================="
    printf "\n"
    cd ./
    protractor protractor.conf.js \
    --ignoreUncaughtExceptions true
}

runTests