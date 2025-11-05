// getCart/index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

// Specify the correct region here
const client = new DynamoDBClient({ region: "us-east-2" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = process.env.TABLE_NAME;

exports.handler = async (event) => {
  try {
    const userId =
      event.requestContext?.authorizer?.jwt?.claims?.sub ||
      event.queryStringParameters?.userId ||
      "test-user";

    const params = {
      TableName: TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId,
      },
    };

    const data = await ddb.send(new QueryCommand(params));
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, items: data.Items }),
    };
  } catch (err) {
    console.error("Error fetching cart:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
