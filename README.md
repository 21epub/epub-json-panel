# epub-app-lib

> Made with create-storybook-react-library

[![NPM](https://img.shields.io/npm/v/epub-app-lib.svg)](https://www.npmjs.com/package/epub-app-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://img.shields.io/travis/com/icey0126/epub-app-lib)](https://travis-ci.com/github/icey0126/epub-app-lib) [![Codecov](https://img.shields.io/codecov/c/github/icey0126/epub-app-lib)](https://codecov.io/gh/icey0126/epub-app-lib)

## Intro

This is a component for react.

## Feature

- [x] Easy-to-use
- [x] Typescript Support
- [x] Storybook UI component

## Install

```bash
npm install --save epub-app-lib
```

## Usage

```tsx
import React, { Component } from 'react';

import MyComponent from 'epub-app-lib';
import 'epub-app-lib/dist/index.css';

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

For Details: See Example

## Developing and running on localhost

First install dependencies and then install peerDeps for storybook dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start   # or npm run storybook
```

To create a bundle library module build:

```sh
npm run build
```

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [icey0126](https://github.com/icey0126)
