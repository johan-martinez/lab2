#!/usr/bin/env bash
cd "/home/maicol/VirtualBox VMs/"
# VBoxManage export Debian --output template/template.ova
VBoxManage import template/template.ova --vsys 0 --vmname $1 --eula accept 
# VBoxManage clonevm Debian --mode all --name $1 --basefolder "/home/maicol/VirtualBox VMs" --register
VBoxManage startvm $1 --type headless
