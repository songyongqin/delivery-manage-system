#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node" "--max_old_space_size=4096"  "$basedir/../node_modules/roadhog/bin/roadhog.js" "$@"
  ret=$?
else 
  node "--max_old_space_size=4096" "$basedir/../node_modules/roadhog/bin/roadhog.js" "$@"
  ret=$?
fi
exit $ret