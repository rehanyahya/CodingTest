# Getting Started

## 1: How to run test the application

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## 2: Reasoning behind the approach taken

- The approach for saving **Trending GIFS** data in redux is by **createEntityAdapter** function by redux toolkit to normalize data by key-value pair.
- Developed a custom wrapper component over Flatlist which handles:
  - All kind of loading states.
  - Sends network call on empty state.
  - Pull to refresh and send network request.
  - Send next page request on page end.
  - Get items on specific searched keywords.

## 3: Assumptions made

No such assumptions has been made because app is working on real data.

## 4: Total Time Taken

**Project Initialization:** Almost 1 hour (due to slow internet) <br />
**Project Completion:** Almost 4 to 5 hours

## 5: Which solutions relied on googling hints, tips or answers

```bash
implementation ("com.facebook.fresco:animated-gif:3.1.0")
```

- When GIF was not playing in android, there was a solution suggested by Facebook is that to implement fresco animation in `android/app/build.gradle`
