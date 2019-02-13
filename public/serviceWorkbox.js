/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "Routes/Components/assets/css/bill.css",
    "revision": "510d95943426663c050205cd0651b1e7"
  },
  {
    "url": "Routes/Components/assets/css/index.css",
    "revision": "2c71d320e908418c69779e54e9561add"
  },
  {
    "url": "Routes/Components/assets/images/download.png",
    "revision": "8f27a808b5cda7b60a4731b6b8e4fbd4"
  },
  {
    "url": "Routes/Components/assets/images/sign-out-alt-solid.svg",
    "revision": "dc07c37ebf0b10a03438ec7bb3507640"
  },
  {
    "url": "Routes/Components/assets/images/waiter.png",
    "revision": "51ca462968b6ff761234068f6ebadeee"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
