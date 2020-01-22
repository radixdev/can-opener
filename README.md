# can-opener
Open IDEs directly from Github Pull Requests

# installation
Instructions are for OSX only at the moment.

## chrome extension
Proper chrome extension in the store coming soon...

### Installing from source
[Load the `./chrome` folder as an unpacked extension](https://developer.chrome.com/extensions/getstarted#manifest).

## config
Create a config file like this under `~/.canopenr/config.json`:

```json
{
  "editors" : {
    "android_studio" : {
      "open_cmd" : "/usr/local/bin/studio %__PROJECT_PATH__%/%__FILE_PATH__%:%__LINE_NUMBER__%"
    },
    "rubymine" : {
      "open_cmd" : "/usr/local/bin/mine %__PROJECT_PATH__%/%__FILE_PATH__%:%__LINE_NUMBER__%"
    },
    "vscode" : {
      "open_cmd" : "/usr/local/bin/code --goto %__PROJECT_PATH__%/%__FILE_PATH__%:%__LINE_NUMBER__%"
    }
  },
  "projects" : {
    "JazzHands/android-sdk" : {
      "path" : "~/code_mobile/android-sdk",
      "editor" : "android_studio"
    },
    "JazzHands/platform" : {
      "path" : "~/platform",
      "editor" : "rubymine"
    },
    "JazzHands/cordova-sdk" : {
      "path" : "~/code_mobile/cordova-sdk",
      "editor" : "vscode"
    }
  }
}
```

## osx install instructions
Follow the [osx `README.md` instructions](https://github.com/radixdev/can-opener/blob/master/osx/README.md).

## windows install instructions
Figure it out and open a PR lol.

## linux install instructions
See Windows instructions.

# misc
https://developer.chrome.com/extensions/overview

## attribution
* Icons made by https://www.flaticon.com/authors/smashicons