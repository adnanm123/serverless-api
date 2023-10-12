'use strict';

const { handler } = require('./index.js');

describe('Testing the readNbaTeam lambda', () => {
  test('Should return a list of Nba', async () => {
    let response = await handler({});

    expect(response.statusCode).toEqual(200);
    let responseBody = JSON.parse(response.body);
    console.log(responseBody);
    expect(responseBody[0].name).toBeTruthy();
  });
})
