'use strict';

const dynamoose = require('dynamoose');

// define our schema
const nbaTeamSchema = new dynamoose.Schema({
  id: Number,
  name: String,
  conference: String,
  color: String,
});

// create our 'Model'
const nbaModel = dynamoose.model('nba-teams', nbaTeamSchema); // the first argument should match the table name on dynamoDB.

exports.handler = async (event) => {
  console.log(`HERE IS THE EVENT OBJECT`, event);
  // TODO implement
  
// let results = await nbaModel.query().exec();

let results = await nbaModel.scan().exec();
console.log('results for our query',results.toJSON());
  // sending back our list of nba from our DB

  const response = {
    statusCode: 200,
    body: JSON.stringify(results),
  };
  return response;
};
