# Expense App [![Travis](https://img.shields.io/travis/expenture/ExpenseApp.svg?style=flat-square)](https://travis-ci.org/expenture/ExpenseApp)

An expense managing application to make life more easier and free. This is the iOS/Android/Web app with [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/).


## Development Setup

Just run:

```bash
$ bin/setup
```

Then start the iOS app with `bin/run-ios`, Android app with `bin/run-android` or web app with `bin/run-web`.

> Note: Make sure you have done [setting up your development environment for React Native](https://facebook.github.io/react-native/docs/getting-started.html) before running native apps.


## Design

To do the design, you'll need the [Sketch](https://www.sketchapp.com/) app installed on your machine.

After running `bin/setup` (yes, we need some dependencies to setup for the design workflow), `open app/design/Design.sketch` and make some changes, save it, then run `bin/export-design` to export your new designs.

> Note: `bin/export-design` will also run automatically via git hooks before you commit changes for `Design.sketch`.


## Build

### Build for iOS

`open ios/Expense.xcodeproj` with Xcode and configure the release build.

#### Build `.app` With CLI

To build a `.app` for manual installation (e.g. using the `ios-deploy` command), run:

```bash
$ bin/build-ios
```

The app will locate at `ios/build/Build/Products/Release-iphoneos/`.

#### Build With Xcode

If you want to upload the app to App Store, or use any Xcode releasing features, be sure to run `bin/render-templates` and `bin/ios-use-bundle-js` before building or archiving the app, and run `bin/ios-use-dev-server` after it's done.

### Build for Android

Before building the releasing Android application, you'll need to have a keystore file containing the signing key to generate the signed release APK.

1. Place the keystore file under the `android/app/` directory, and rename it to `release-key.keystore`.
2. Edit `buildConfig.js` and fill in the `androidReleaseKeystorePassword`, `androidReleaseKeyAlias` and `androidReleaseKeyPassword` properties.

After completing the steps above, run:

```bash
$ bin/build-android
```

The release APK will locate at `android/app/build/outputs/apk/`.


## Badges

- [![Travis](https://img.shields.io/travis/expenture/ExpenseApp.svg?style=flat-square)](https://travis-ci.org/expenture/ExpenseApp)
- [![Coveralls](https://img.shields.io/coveralls/expenture/ExpenseApp.svg?style=flat-square)](https://coveralls.io/github/expenture/ExpenseApp)
- [![David](https://img.shields.io/david/expenture/ExpenseApp.svg?style=flat-square)](https://david-dm.org/expenture/ExpenseApp)
- [![David](https://img.shields.io/david/dev/expenture/ExpenseApp.svg?style=flat-square)](https://david-dm.org/expenture/ExpenseApp#info=devDependencies)
