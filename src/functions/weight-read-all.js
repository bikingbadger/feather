require('dotenv').config();
const axios = require('axios');

exports.handler = (event, context, callback) => {
  console.log('===============================================');
  console.log('===============================================');
  console.log(`${event.httpMethod}: ${event.path}`);
  return axios({
    url: 'https://graphql.fauna.com/graphql',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
    method: 'post',
    data: {
      query: `
        query FindAllWeights {
          allWeights(_size: 90) {
            data {
              weightDate
              weightKilograms
            }
            before
            after
          }
        }
        `,
    },
  })
    .then((result) => {
      const weightArray = result.data.data.allWeights.data;
      console.log('weightArray',weightArray);
      console.log('===============================================');
      console.log('===============================================');
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(weightArray),
      });
    })
    .catch((error) => {
      console.log(error);
      console.log('===============================================');
      console.log('===============================================');
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
