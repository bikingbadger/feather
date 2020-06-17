require('dotenv').config();
const axios = require('axios');

const getResponse = async (after = null) => {
  // Calculate size of the pagination
  const size = `_size: 90`;

  // Create a cursor if pagination value is given for the next page
  // This value is used in the query parameter below
  const cursor = after ? `,_cursor: "${after}"` : '';
  // console.log(cursor);
  return await axios({
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
        allWeights(${size} ${cursor}) {
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
  });
};

const getWeights = async () => {
  let response = await getResponse();
  let weightArray = [];

  // Push the array if there is data
  response.data.data.allWeights.data &&
    weightArray.push(response.data.data.allWeights.data);

  // Find the next page
  let nextPage = response.data.data.allWeights.after;

  // Check if there is another page in the pagination, using recursion
  // get the next values
  while (nextPage) {
    // Get the next page of results using the nextPage value returned
    // by the previous query
    response = await getResponse(nextPage);

    // Push the array if there is data
    response.data.data.allWeights.data &&
      weightArray.push(response.data.data.allWeights.data);

    // Find the next page
    nextPage = response.data.data.allWeights.after;
  }

  // Return flattened the array that is for each page into a single array
  return weightArray.flat(1);
};

exports.handler = async (event, context, callback) => {
  console.log('===============================================');
  console.log('===============================================');
  console.log(`${event.httpMethod}: ${event.path}`);

  const weightArray = await getWeights();

  /**
   * Sort the data from oldest to newest based on the date
   */
  weightArray.sort((a, b) => {
    const dateA = new Date(a.weightDate);
    const dateB = new Date(b.weightDate);

    /**
     * Return result based on whether the date is bigger or smaller
     * The return is based on sorting oldest to newest so
     * newer values should come after older ones
     */
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });

  console.log('===============================================');
  console.log('===============================================');
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(weightArray),
  });
};
