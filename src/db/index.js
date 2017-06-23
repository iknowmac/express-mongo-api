import mongoose from 'mongoose';

export default () => {
  const NODE_ENV = process.env.NODE_ENV || 'production';
  const HOST = process.env.MONGO_HOST || 'localhost';
  const PORT = process.env.MONGO_PORT || 27017;
  const DBNAMEPRE = process.env.MONGO_NAME || 'ramen';
  const DBNAME = `${DBNAMEPRE}_${NODE_ENV}`;
  const AUTH = process.env.MONGO_USER && process.env.MONGO_PASSWORD
    ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
    : '';
  const URI = `mongodb://${AUTH}${HOST}:${PORT}/${DBNAME}`;

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
