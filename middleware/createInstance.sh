#!/bin/bash
# args 1- instance_name. 2- ip of instance. 
cd vagrant/
cp -rT `pwd`/template `pwd`/$1
cd $1
IP=$2 vagrant up