jest.unmock('../generateUUID');

import generateUUID from '../generateUUID';

describe('generateUUID', () => {
  it('generates an UUID', () => {
    const regexpOfUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    expect(generateUUID()).toMatch(regexpOfUUID);
    expect(generateUUID()).toMatch(regexpOfUUID);
    expect(generateUUID()).toMatch(regexpOfUUID);
    expect(generateUUID()).toMatch(regexpOfUUID);
    expect(generateUUID()).toMatch(regexpOfUUID);
  });
});
