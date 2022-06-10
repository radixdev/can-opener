import sys
import os
from urllib.parse import urlsplit, parse_qs
import json

PROJECT_PATH_TEMPLATE_VAR = "%__PROJECT_PATH__%"
FILE_PATH_TEMPLATE_VAR = "%__FILE_PATH__%"
LINE_NUMBER_TEMPLATE_VAR = "%__LINE_NUMBER__%"

# https://support.shotgunsoftware.com/hc/en-us/articles/219031308-How-to-launch-external-applications-using-custom-protocols-rock-instead-of-http-
def main(args):
  # Make sure we have only one arg, the URL
  if len(args) != 1:
    return 1

  # Load our config
  with open(os.path.expanduser('~/.canopenr/config.json')) as json_file:
    config = json.load(json_file)

  # Get the open parameters
  url = args[0]
  splitUrl = urlsplit(url)
  link = parse_qs(splitUrl.query)

  projectName = link['project'][0]
  filePath = link['file'][0]
  lineNumber = link['line'][0]

  # Get the editor and local path for the project
  editor = config['projects'][projectName]['editor']
  localProjectPath = config['projects'][projectName]['path']

  # Get the command template for the editor
  editorOpenCommandTemplate = config['editors'][editor]['open_cmd']

  # Now do our replacements
  openCommand = editorOpenCommandTemplate
  openCommand = openCommand.replace(PROJECT_PATH_TEMPLATE_VAR, localProjectPath)
  openCommand = openCommand.replace(FILE_PATH_TEMPLATE_VAR, filePath)
  openCommand = openCommand.replace(LINE_NUMBER_TEMPLATE_VAR, lineNumber)
  os.system(openCommand)

if __name__ == '__main__':
  sys.exit(main(sys.argv[1:]))