import gameSave from '../app';
import read from '../reader';

jest.mock('../reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('app reject test', () => {
  expect.assertions(1);
  read.mockRejectedValue(new Error('Some error'));
  return expect(gameSave()).rejects.toThrowError('Some error');
});
