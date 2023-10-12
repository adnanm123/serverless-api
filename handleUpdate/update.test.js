const { handler } = require('./index');

describe('Update Lambda Function', () => {
  it('should update an item in the database', async () => {
    const event = {
      body: JSON.stringify({
        id: 123, // Provide a valid ID
        data: { name: 'Updated Name', conference: 'Updated Conference', color: 'Updated Color' }, // Provide updated data
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual(expect.objectContaining({
      // Check if the response structure matches the updated item
      // Ensure that the updated properties are present
    }));
  });

  it('should handle missing ID or data gracefully', async () => {
    const event = {
      body: JSON.stringify({
        // Missing ID or data
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual(expect.objectContaining({ error: 'Invalid request. Missing ID or data.' }));
  });

  it('should handle database update errors gracefully', async () => {
    const event = {
      body: JSON.stringify({
        id: 456, // Provide a valid ID
        data: { /* Updated data */ },
      }),
    };

    // Mock the DynamoDB update method to simulate an error
    jest.spyOn(nbaModel, 'update').mockRejectedValue(new Error('Update failed'));

    const response = await handler(event);

    expect(response.statusCode).toBe(500);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual(expect.objectContaining({ error: 'Failed to update the item in the database' }));
  });
});
