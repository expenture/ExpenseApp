# Expense App

An expense managing application to make life more easier and free. This is the iOS/Android/Web app with [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/).


## Development Setup

Just run:

```bash
$ bin/setup
```

Then start the iOS app with `bin/run-ios`, Android app with `bin/run-android` or web app with `bin/run-web`.

> Note: Make sure you have done [setting up your development environment for React Native](https://facebook.github.io/react-native/docs/getting-started.html) before running native apps.

## Build

### Build for Android

Before building the releasing Android application, you'll need to have a keystore file containing the signing key to generate the signed release APK.

1. Place the keystore file under the `android/app/` directory, and rename it to `release-key.keystore`.
2. Edit `config.js` and fill in the `androidReleaseKeystorePassword`, `androidReleaseKeyAlias` and `androidReleaseKeyPassword` properties.

After completing the steps above, run:

```bash
bin/build-android
```

The release APK will locate at `android/app/build/outputs/apk/`.
