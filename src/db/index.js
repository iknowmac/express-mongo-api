import mongoose from 'mongoose';

export default () => {
  const NODE_ENV = process.env.NODE_ENV;
  const HOST = process.env.DB_HOST || 'localhost';
  const PORT = process.env.DB_PORT || 27017;
  const NAME = `ramen_${NODE_ENV}`;
  const AUTH = process.env.DB_USER && process.env.DB_PASSWORD
    ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
    : '';
  const URI = `mongodb://${AUTH}${HOST}:${PORT}/${NAME}`;

  mongoose.Promise = global.Promise;
  mongoose.connect(URI, (err) => {
    if (err) {
      return console.error(`Error connecting to database ${URI} ${err}`);
    }

    return NODE_ENV !== 'test'
      ? console.log(`Connected to database ${URI}`)
      : null;
  });
};
