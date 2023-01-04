# Do You Stream Tho

Chrome extension that scrapes the current site you are on and tells you if there are twitch streamer links on the page. Shows you live data when you click it

## Install & Use

- Download, run `npm run build`
- Go to your extensions on chrome
- Turn on dev mode in the right hand corner
- Click “load unpacked”
- Click the puzzle piece icon in chrome (top right) and then the pin next to the glitch icon (yes I remade the glitch icon in 16x16, no I didn't make it for all required sizes :rip:)
- Go to any page that has twitch streamers like: https://www.youtube.com/watch?v=R-WNO5AUha0&ab_channel=NICKMERCS or https://twitter.com/pokimanelol/with_replies
- See a number for the number of links found, click the extension to see live data and click off to the user’s page
- report issues, or contribute if you want!

## Built With

Started with boilerplate from: https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate which used:

- [Svelte](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CRXJS Vite Plugin](https://github.com/crxjs/chrome-extension-tools/blob/main/packages/vite-plugin/README.md)
- [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Development

```bash
# install dependencies
npm i

# build files to `/dist` directory
# HMR for extension pages and content scripts
npm run dev
```

## Build

```bash
# build files to `/dist` directory
$ npm run build
```

## Load unpacked extensions

[Getting Started Tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

![Example](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png?auto=format&w=571)
