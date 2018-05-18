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

## Dev commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Api Integration

The app uses an [ApiInterface](/src/api/ApiInterface) to interact with a live/mock api so they can easily be switch out for testing.
It uses the `MOCK_API` and `API_URL` config variables to decide if it is using the mock version or not.

## Deployment

The app uses Docker to build & deploy the application.
It uses the [Dockerfile](/Dockerfile) to build the assets and then a slightly modified version of [Nginx](https://www.nginx.com/) to serve the generated files.

### Deployment Build

This repo uses a CI to build the web into a docker image, ready to be deployed.
Whenever a commit is pushed with an git tag it builds an image for that commit.
To tag the commit, use the `npm version ...` command which updates the package
version and commits the `package.json` tagged with the new version.

```bash
# Update the npm version
# > Make sure to run without unstaged changes
npm version # patch | minor | major | prepatch | preminor | prerelease
```

**Extras**

```bash
# If using a dist-tag i.e. beta, use `npm prerelease` to increment subversions
npm version 1.0.0-beta.1  # 1.0.0-beta.1
npm version prerelease    # 1.0.0-beta.2

# To experiment with npm version
mkdir test_dir
cd test_dir
npm init -y
npm version # ...
```

### Deployment Config

To configure the deployment, use the `CONFIG_KEYS` environment variable.
Which should be a csv of environment variables you want inserted,
the variables are inserted at `window.CONFIG.YOUR_VAR`.

You should use the [Config Mixin](/src/mixins/Config.js) to access variables
which falls back to using `process.env` (where webpack config is placed).

```yml
environment:
  CONFIG_KEYS: MOCK_API,API_URL
  API_URL: https://api.gabber.audio
  MOCK_API: true
```

---

For a detailed explanation on how the project was setup, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
