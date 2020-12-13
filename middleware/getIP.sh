echo "09876543" | sudo -S arp-scan --interface=vboxnet0 192.168.56.0/24| awk '{print $1}'|tail -n +3|head -n -3 
