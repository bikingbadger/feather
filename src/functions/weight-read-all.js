require('dotenv').config();
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log(`${event.httpMethod}: ${event.path}`);
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/all_weight'))))
    .then((response) => {
      const references = response.data;
      // console.log('references', references);
      const getAllDataQuery = references.map((ref) => {
        // console.log(ref);
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllDataQuery).then((ret) => {
        console.log(ret);
        const weightSeries = ret.map(data => {
          return data.data;
        })
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(weightSeries),
        });
      });
    })
    .catch((error) => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
