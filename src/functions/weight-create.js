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
  console.log('body:',event.body);
  if (!event.body.weight) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify('Expected weight object'),
    });
  }
  const data = JSON.parse(event.body);
  
  //   const todoItem = {
  //     data: data,
  //   };
  //   /* construct the fauna query */
  //   return client
  //     .query(q.Create(q.Ref('indexes/all_weight'), todoItem))
  //     .then((response) => {
  //       console.log('success', response);
  //       /* Success! return the response with statusCode 200 */
  //       return callback(null, {
  //         statusCode: 200,
  //         body: JSON.stringify(response),
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //       /* Error! return the error with statusCode 400 */
  //       return callback(null, {
  //         statusCode: 400,
  //         body: JSON.stringify(error),
  //       });
  //     });
};
