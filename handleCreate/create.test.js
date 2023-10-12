'use strict';

const createNbaTeam = require('./index.js');

describe('Testing the createNbaTeam lambda', () => {
  it('should create a new Nba team', async () => {
    const event = {
      body: {
        id: 4,
        name: 'Boston Celtics',
        conference: 'East',
        color: 'Green',
      },
    };

    const result = await createNbaTeam.handler(event);

    expect(result.statusCode).toBe(200);
    expect(typeof result.body).toBe('string');

    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('id', 4);
    expect(body).toHaveProperty('name', 'Boston Celtics');
    expect(body).toHaveProperty('conference', 'East');
    expect(body).toHaveProperty('color', 'Green');
  });
});
