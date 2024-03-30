// Tests App's command execution
jest.mock('fs');
jest.mock('../myMoney', () => ({
  add: jest.fn(),
}));

// Mock readline to directly simulate the line event triggering
jest.mock('readline', () => ({
  createInterface: () => ({
    on: (eventName, callback) => {
      if (eventName === 'line') {
        callback('ADD 100');
      }
      if (eventName === 'close') {
        callback();
      }
    }
  }),
}));

const GeekTrust = require('../geektrust');
const myMoney = require('../myMoney');

// Define test suite for App module
describe('App', () => {
  it('executes command from file', () => {
    GeekTrust();
    expect(myMoney.add).toHaveBeenCalledWith(expect.anything(), '100');
  });
});
