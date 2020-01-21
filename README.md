# can-opener
Open IDEs directly from Github Pull Requests

## attribution
* Icons made by https://www.flaticon.com/authors/smashicons

## config
Create a config file like this under `~/.canopenr/config.json`:

```json
{
  "editors" : {
    "android_studio" : {
      "open_cmd" : "/usr/local/bin/studio %__PROJECT_PATH__%/%__FILE_PATH__%:%__LINE_NUMBER__%"
    }
  },
  "projects" : {
    "JazzHands/android-sdk" : {
      "path" : "~/code_mobile/android-sdk",
      "editor" : "android_studio"
    }
  }
}
```

## misc
https://developer.chrome.com/extensions/overview

