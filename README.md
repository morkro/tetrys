# Tetrys
Tetris as Progressive Web Application

## Development :wrench:
This application _requires_ Node.js `>=6.0.0` to run locally and the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) for debugging Redux applications.

To get started, `npm install` all dependencies. To run the application in **development** mode, use the `npm run dev` command. A **production** build can be created with `npm run build`.

### Architecture
Tetrys uses [Redux](http://redux.js.org/) as state container, and no view library. The Sass architecture follows the [7-1 Pattern](http://sass-guidelin.es/#architecture) from Sass-Guidelines.

## Tools, Resources and Credits :heart:
This project couldn't have been build without the awesome open source tools from the community, free online tutorials, articles, and other resources. Credits goes to:

- [Implementing Tetris](http://gamedevelopment.tutsplus.com/series/implementing-tetris--gamedev-12717) by [Michael James Williams](http://tutsplus.com/authors/mjw)
- [@dionyziz/canvas-tetris](https://github.com/dionyziz/canvas-tetris) _(This project helped me a lot understanding a Tetris implementation in JavaScript. I used and modified parts of his codebase.)_
- Various StackOverflow answers

## License :copyright:
[Apache License, Version 2.0](LICENSE.md)