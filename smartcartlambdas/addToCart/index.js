// Import AWS SDK v3 DynamoDB modules
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

// Create DynamoDB client
const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const TABLE = process.env.TABLE_NAME;

// Lambda handler
exports.handler = async (event) => {
  try {
    // Parse input body (JSON string)
    const body = event.body ? JSON.parse(event.body) : {};

    // Determine userId (from Cognito JWT, body, or fallback)
    const userId =
      event.requestContext?.authorizer?.jwt?.claims?.sub ||
      body.userId ||
      "test-user";

    // Validate input
    if (!body.productId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "productId is required" }),
      };
    }

    // Item to store in DynamoDB
    const item = {
      userId,
      productId: body.productId,
      name: body.name || "",
      price: body.price || 0,
      source: body.source || "",
      addedAt: Date.now(),
    };

    // Save to DynamoDB
    await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));

    // Return success response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, item }),
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
