/**
 * @providesModule mockStore
 *
 * The code below is for throwing errors when this module is used outside of the
 * testing environment (Jest), where there is no auto mocking. See the file in
 * ./__mocks__/ for the real implemention.
 */

const MockStoreException = function (message) {
  this.message = message;
};

export default function () {
  throw MockStoreException('Error: mockStore should only be used for testing, but it seems that you used it outside the test environment');
}
