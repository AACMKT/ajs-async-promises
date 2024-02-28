import read from '../reader';
import GameSavingLoader from '../GameSavingLoader';

jest.mock('../reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('GameSavingLoader reject test', () => {
  expect.assertions(1);
  read.mockRejectedValue(new Error('Some error'));
  return expect(GameSavingLoader.load()).rejects.toThrowError('Some error');
});
