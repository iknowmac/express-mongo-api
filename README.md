Express, ES6, and MongoDB REST API Boilerplate
==================================

This is a straight forward boilerplate for building RESTful APIs with [ES6](http://es6-features.org/#Constants), [Express](https://expressjs.com/),
[MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/).

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Docker support via [Docker](https://www.docker.com/)

Getting Started
---------------

```sh
# clone it
git clone git@github.com:towen/express-mongo-api.git
cd express-mongo-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

License
-------

MIT
