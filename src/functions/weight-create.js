require('dotenv').config();

const axios = require('axios');
console.log('===============================================');
console.log('===============================================');
exports.handler = (event, context, callback) => {
  console.log(`${event.httpMethod}: ${event.path}`);
  const weight = JSON.parse(event.body);
  console.log(weight.weightKilograms);
  const query = `mutation CreateWeight {
    createWeight(data: {
      weightDate: "${weight.weightDate}"
      weightKilograms: ${weight.weightKilograms || 0}
      weightBone: ${weight.weightBone || 0}
      weightMuscle: ${weight.weightMuscle || 0}
      waterPercent: ${weight.waterPercent || 0}
      fatPercent: ${weight.fatPercent || 0}
      bellyIndex: ${weight.bellyIndex || 0}
    }) {
      weightDate
      weightKilograms
     }
  }`;
  return axios({
    url: 'https://graphql.fauna.com/graphql',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
    method: 'post',
    data: {
      query: query,
    },
  })
    .then((result) => {
      console.log(result.data);
      console.log('===============================================');
      console.log('===============================================');
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
