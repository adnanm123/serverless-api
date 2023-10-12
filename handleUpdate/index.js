'use strict';

const dynamoose = require('dynamoose');

// Define our schema
const nbaTeamSchema = new dynamoose.Schema({
  id: Number,
  name: String,
  conference: String,
  color: String,
});

// Create our 'Model'
const nbaModel = dynamoose.model('nba-teams', nbaTeamSchema); // The first argument should match the table name on DynamoDB.

exports.handler = async (event) => {
  console.log('HERE IS THE EVENT OBJECT', event);

  try {
    const body = JSON.parse(event.body);

    if (!body.id || !body.data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request. Missing ID or data.' }),
      };
    }

    // Update the item in the DynamoDB table using the provided ID and data
    const updatedItem = await nbaModel.update({ id: body.id }, body.data);

    // Sending back the updated item
    const response = {
      statusCode: 200,
      body: JSON.stringify(updatedItem),
    };
    return response;
  } catch (error) {
    // Handle any errors and return an error response
    console.error('Error:', error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update the item in the database' }),
    };
    return response;
  }
};
