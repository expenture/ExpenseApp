// Specify some common modules that should not be mocked for Jest.

// Thease are mocking utils, don't mock then!
jest.unmock('nock');
jest.unmock('redux-mock-store');

// Common utils that should not be mocked
jest.unmock('sleep');

// Redux core related modules that should not be mocked
jest.unmock('redux');
jest.unmock('redux-actions');
jest.unmock('redux-thunk');

// We mock requests by nock, so unmock fetch
jest.unmock('isomorphic-fetch');
jest.unmock('utils/fetch');

// Common modules or utils in the app that should not be mocked
jest.unmock('utils/stringifyJSON');
