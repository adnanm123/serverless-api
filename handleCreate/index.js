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
const nbaModel = dynamoose.model('nba-teams', nbaTeamSchema);

exports.handler = async (event) => {
  console.log('HERE IS THE EVENT OBJECT', event);

  const requestBody = JSON.parse(event.body);
  console.log('Request Body:', requestBody);
  console.log('Request ID:', requestBody.id);
  
  let results = await nbaModel.create(event.body);

  // Prepare the response
  const response = {
    statusCode: 201, // Use 201 for resource creation
    body: JSON.stringify(results), // Return the newly created record
  };

  return response;
};
