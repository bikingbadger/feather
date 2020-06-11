require('dotenv').config();
const axios = require('axios');

exports.handler = (event, context, callback) => {
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
          allWeights {
            data {
              weightDate
              weightKilograms
            }
          }
        }
        `,
    },
  })
    .then((result) => {
      console.log(result.data);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.data),
      });
    })
    .catch((error) => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
