import read from './reader';
import json from './parser';

export default class GameSavingLoader {
  static load() {
    return read().then((data) => json(data)).catch((err) => { throw Error(err.message); });
  }
}
