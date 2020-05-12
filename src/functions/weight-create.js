require('dotenv').config();
import faunadb from 'faunadb'; /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  console.log('======================================================');
  console.log(event);
  console.log(context);
  console.log('======================================================');
  const weight = { data: JSON.parse(event.body) };

  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/weight'), weight))
    .then((response) => {
      console.log('success', response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 201,
        body: JSON.stringify(weight.data),
      });
    })
    .catch((error) => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
