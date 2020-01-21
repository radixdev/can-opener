Make this an applescript command, export as Application, double click on the application.
```
on open location this_URL
	do shell script "/usr/local/bin/python3 /Users/juliancontreras/runit/can-opener/osx/parser.py '" & this_URL & "'"
end open location
```