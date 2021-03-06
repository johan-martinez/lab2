#!/bin/bash

true > logs/latest.log
for server in "$@"
do  
    echo $server
    result=`curl -o /dev/null -s -w %{size_download}  $server`;
    [ $result = 0 ] && info="DOWN" || info="RUNNING"
    info="`date` SERVER $server: SERVICE $info;";
    echo $info >> logs/history.log
    [ $result = 0 ] && echo "$server false" >> logs/latest.log || echo "$server true" >> logs/latest.log    
done