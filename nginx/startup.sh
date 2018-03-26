#!/usr/bin/env bash

#
# This script replaces the nginx:alpine's command inject a bit of custom logic.
# - On start it injects your custom environment variables onto the js window
# - It uses CONFIG_KEYS as the keys to lookup
# - It injects a js script at the start of the compiled index.html
#


# Add to start of html file
js="<head>"
js="${js}<script>"
js="${js}window.CONFIG={"

# Add each environment variable (specified with CONFIG_KEYS variable)
for key in $(echo $CONFIG_KEYS | sed "s/,/ /g")
do
  js="${js}${key}:'`printenv $key`',"
done

# Remove the last comma (for valid javascript)
js=`echo "$js" | sed 's/,*$//g'`

# Finish the object and close the tag
js="${js}};</script><meta charset"

# Escape values the regex uses
js=`echo "$js" | sed -e 's/[]\/$*.^[]/\\\&/g'`

# Insert the script at the start of the head tag
sed -i "s/<head>.*<meta charset/$js/" /usr/share/nginx/html/index.html

# Run nginx normally
nginx -g "daemon off;"
