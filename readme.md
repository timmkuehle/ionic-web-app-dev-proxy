# Ionic web app development proxy

This package provides a proxy server for HTTP requests from an Ionic web application running on your local machine during development and testing.

## Why though?

Sadly there is no longer a built-in function to successfully make HTTP calls when testing an Ionic web app during development. Standard `fetch` calls will fail due to CORS errors. The same is true for calls made by Capacitor's HTTP plugin, which isn't surprising, since the plugin only proxies native HTTP calls on emulators or physical devices - web app HTTP calls are executed as normal `fetch`calls.
This package attempts to cover that oversight, by providing an easy-to-use, zero-config proxy server that forwards HTTP calls and returns CORS compliant responses. This way browsers won't block HTTP calls and the Ionic web app can be locally tested.

## Installation

Clone the repo to a subdirectory of your Ionic app directory.

```
git clone https://github.com/timmkuehle/ionic-web-app-dev-proxy.git

// or

git clone git@github.com:timmkuehle/ionic-web-app-dev-proxy.git
```
