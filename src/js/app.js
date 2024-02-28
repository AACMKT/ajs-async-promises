import GameSavingLoader from './GameSavingLoader';

export default function gameSave() {
  return GameSavingLoader.load().then((saving) => JSON.parse(saving), (error) => {
    throw error;
  });
}
