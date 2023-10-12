'use strict';

const createNbaTeam = require('./index.js');

describe('Testing the createNbaTeam lambda', () => {
  it('should create a new Nba team', async () => {
    const event = {
      body: {
        id: 1, // Provide a valid ID
        name: 'Boston Celtics',
        conference: 'East',
        color: 'Green',
      },
    };
  console.log('checking to see if EVENT BODY ID EXISTS', event.body.id)

    const result = await createNbaTeam.handler(event);

    expect(result.statusCode).toBe(200);
    expect(typeof result.body).toBe('string');

    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('name', 'Boston Celtics');
    expect(body).toHaveProperty('conference', 'East');
    expect(body).toHaveProperty('color', 'Green');
  });
});
