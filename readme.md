# Ionic web app development proxy

This package provides a proxy server for HTTP requests from an Ionic web application running on your local machine during development and testing.

## Why though?

Sadly there is no longer a built-in function to successfully make HTTP calls when testing an Ionic web app during development. Standard `fetch` calls will fail due to CORS errors. The same is true for calls made by Capacitor's HTTP plugin, which isn't surprising, since the plugin only proxies native HTTP calls on emulators or physical devices - web app HTTP calls are executed as normal `fetch` calls.
This package attempts to cover that oversight, by providing an easy-to-use, zero-config proxy server that forwards HTTP calls and returns CORS compliant responses. This way browsers won't block HTTP calls and the Ionic web app can be locally tested.

## Installation

Install this package in your Ionic project as a dev dependency

```shell
# npm
npm install --save-dev ionic-web-app-dev-proxy
```

## Usage

Adjust the dev script in your app's package.json to look like this:

```json
"scripts": {
  "dev": "ionic-web-app-dev-proxy serveWithProxy",
}
```

When you now run `npm run dev` the script will execute `ionic serve` to preview your app and start the proxy server on port 8910 to be able to forward HTTP calls.

Optionally you can also add a script to start the proxy server without running ionic serve. In this case you have to provide an Ionic serve address (protocol, hostname and port of your running Ionic app) manually:

```json
"scripts": {
  "dev": "ionic-web-app-dev-proxy serveWithProxy",
  "startWebAppProxy": "ionic-web-app-dev-proxy startProxyServer http://localhost:8100"
}
```

In your app you can import the `adaptFetchUrl` function and use it to wrap your fetch URLs. This function will ensure that HTTP calls are redirected through the proxy when testing the web app locally and simply return the unaltered URL in all other scenarios:

```ts
import { adaptFetchUrl } from "../scripts/ionic-web-app-dev-proxy";

try {
  const response = await fetch(adaptFetchUrl("https://api.example.com/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      surname: "Jane",
      last_name: "Doe",
      date_of_birth: {
        year: "1969",
        month: "11",
        day: "15"
      }
    })
  });

  console.log(`Response: ${await response.json()}`);
} catch (error) {
  console.log(`Error while fetching data: ${error}`);
}
```

This is especially useful when you wrap your HTTP calls in an Ionic service, since it removes the need to call `adaptFetchUrl` for each individual call.
