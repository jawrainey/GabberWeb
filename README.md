# Gabber Web

A user interface for manage projects and annotate audio conversations using the Gabber Api.
It is a [Vue](https://vuejs.org) webapp using [npm](https://www.npmjs.com/) packages, written using
[JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript),
[Sass](https://sass-lang.com/) and [Pug](https://pugjs.org/api/getting-started.html),
linted with [ESLint](https://eslint.org/), built with
[Webpack](https://webpack.js.org/) and deployed through
[Docker](https://www.docker.com/).

## Project Structure

| Path | Info |
| ---- | ---- |
| `/build`  | The Webpack configuration and build scripts, generated using the [vue-cli](https://github.com/vuejs/vue-cli) |
| `/config` | Configurations for different versions of the build i.e production vs dev |
| `/nginx` | Config for the nginx server the app is deployed in |
| `/src` | The actual source code for the webapp |
| `/src/api` | Files for interacting with/mocking the Gabber API |
| `/src/assets` | Non-JavaScript assets to be compiled into the app |
| `/src/components` | Vue single file components (.vue), grouped by context |
| `/src/const` | Cross project constant values |
| `/src/events` | Vue [event busses](https://alligator.io/vuejs/global-event-bus/) |
| `/src/layouts` | Vue components which solely layout content using `<slot>` elements |
| `/src/mixins` | Vue [mixins](https://vuejs.org/v2/guide/mixins.html) |
| `/src/router` | The [vue-router](https://router.vuejs.org/en/) and its routes |
| `/src/store` | The [vue-store](https://vuex.vuejs.org/en/) and its modules |
| `/src/views` | Vue components that are directly routed to by the router |
| `/static` | Static assets that are served along side the compiled source |
| `/tools` | Scripts for development, namely the docker postversion one |

The entrypoint to the app is `/src/main.js`, if you follow the dependancies from there you should work out structure of the app.

## Api Integration

The app uses an [ApiInterface](/src/api/ApiInterface) to interact with a live/mock api so they can easily be switch out for testing.
It uses the `MOCK_API` and `API_URL` config variables to decide if it is using the mock version or not.

## Deployment

The app uses Docker to deploy the app. When you set the version using `npm version ...`
it will automatically build and push a new version of the app to the docker registry.
To do this is uses the [Dockerfile](/Dockerfile) to build the assets and then a slightly modified version of [Nginx](https://www.nginx.com/) to server the generated files.

The image is setup to allow custom variables to be passed in to your container.
To do this set the `CONFIG_KEYS` environment variable as a csv of other environment variables keys (without whitespace).
Then it will create & inject those variables onto a `window.CONFIG` object,
e.g. for `CONFIG_KEYS=API_URL` it will inject `window.CONFG.API_URL` for you to use.

For more info about config explore [startup.sh](/nginx/startup.sh)

## Dev Commands

```bash

# Install dependancies
npm install

# Run the dev build
# - Spin up a local server on http://localhost:8080 with hot reloading
npm run dev

# Manually lint code (if you don't have an ide-based eslint-er)
npm run lint

# Publish a new version
# - Builds a new docker image of the new version and pushes to the registry
# - Uses the REGISTRY & the package's version to tag the image
npm version # (patch|minor|major|...) or --help

# Force the docker version (if you really need to)
npm run postversion

```
