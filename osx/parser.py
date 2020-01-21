import sys
import pprint
import os
from urllib.parse import urlsplit, parse_qs

# https://support.shotgunsoftware.com/hc/en-us/articles/219031308-How-to-launch-external-applications-using-custom-protocols-rock-instead-of-http-
def main(args):
  # Make sure we have only one arg, the URL
  if len(args) != 1:
      return 1

  url = args[0]
  splitUrl = urlsplit(url)
  link = parse_qs(splitUrl.query)
  print(splitUrl)
  print(link)

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))