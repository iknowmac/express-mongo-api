import path from 'path';

module.exports.load = function globalsLoad() {
  global.model = function model(filename) {
    const name = normalize(filename);
    return require(path.join(__dirname, 'models', name));
  };
};

const normalize = (name) =>
  (name[0].toUpperCase() + name.substr(1))
    .match(/([A-Z][^A-Z]*)/g).join('-')
    .replace(/[_\s-]+/g, '-').toLowerCase();
