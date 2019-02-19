# Relogio

[TOC]

## Dependencies

With NodeJS +11.1.0 installed:

```bash
npm install expo-cli --global
```

To install local project dependecies:

```bash
npm i
```

## Scripts

The project was setup by the expo.io tool, and so were the scripts. Their documentation should be checked more more options and details.

To run the development project:

```bash
npm start
```

To build a native app, specific platform instructions must be followed.

### Publish Development

Users need to install the expo.io app on their mobile.

[iTunes Store](https://itunes.apple.com/app/apple-store/id982107779)
[Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&amp;referrer=www)

To publish the app code to expo.io servers/cdn, run:

```bash
expo publish
```

At the end of the output, an url will be provided (eg) `https://exp.host/@alexmipego/relogio`. At the destination page several options are provided, including a scannable QR code.

![QR](http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=exp%3A%2F%2Fexp.host%2F%40alexmipego%2Frelogio&qzone=1&margin=0&size=200x200&ecc=L)



### Publish to iOS' AppStore

TODO: Copy expo.io docs and add notes.

### Publish to Android's Google Play

TODO: Copy expo.io docs and add notes.

## Source

The structure of the project was initialy defined by the expo.io tool, and the rest follows a standard React structure.

The main code lives in `stores`, `views`, and `components`.

