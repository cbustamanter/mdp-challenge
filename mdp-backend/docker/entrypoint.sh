#!/bin/bash

if [  -n "$environment" ]
then
    echo "loading ENVS for" $environment
    cat $environment.env | sed 's/^/export /' > /tmp/$environment.source
    source /tmp/$environment.source    
    cat /tmp/$environment.source
    rm -f /tmp/$environment.*
    echo "env loaded"
else    
    echo "loading local envs"
    cat .env
    source .env
fi

node index.js