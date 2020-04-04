#/usr/bin/bash

# Change directory to the location of this script (because it is going to be called from elsewhere).
# Explanation: Expand $0 from ${0} to ${0%/*}, this matches the last / and removes the rest, turning
# a full path with filename into just base path.
cd "${0%/*}"

py manage.py runserver 0.0.0.0:5000
