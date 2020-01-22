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

### config keys

* `editors` - A JSON object containing all the editor aliases.
* `editors.open_cmd` - The terminal command to open the editor for the given project, file, and line number.
  * `%__PROJECT_PATH__%` is substituted with the project path as given via `projects.path`. E.g. `~/code_mobile/android-sdk`.
  * `%__FILE_PATH__%` is substituted with the file path as communicated from the chrome extension deeplink. E.g. `com/jazzhands/src/hamilton.java`.
  * `%__LINE_NUMBER__%` is substituted with the line number as communicated from the chrome extension deeplink. E.g. `9001`.
  * The final generated command might look like `/usr/local/bin/studio ~/code_mobile/android-sdk/com/jazzhands/src/hamilton.java:9001` after substitutions for the `JazzHands/android-sdk` project.
* `projects` - For the URL https://github.com/JazzHands/android-sdk, `JazzHands/android-sdk` is the project.
* `projects.path` - The path, on your local machine, where the project exists.
* `projects.editor` - The alias for the editor. This string is completely arbitrary and is only used to link to an editor present in the `editors` object.

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