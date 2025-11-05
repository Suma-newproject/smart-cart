// index.js  (ES Module syntax)
import { DynamoDBClient, QueryCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-2" });
const TABLE_NAME = "SmartCart-Carts";

export const handler = async (event) => {
  try {
    console.log("Event received:", JSON.stringify(event, null, 2));
    const userId = event.pathParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing userId in path" }),
      };
    }

    // Query for items under this userId
    const queryParams = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "userId = :u",
      ExpressionAttributeValues: { ":u": { S: userId } },
    };

    const queryResult = await client.send(new QueryCommand(queryParams));

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: `No items found for user: ${userId}`,
        }),
      };
    }

    // Delete all items found
    await Promise.all(
      queryResult.Items.map((item) =>
        client.send(
          new DeleteItemCommand({
            TableName: TABLE_NAME,
            Key: {
              userId: { S: item.userId.S },
              productId: { S: item.productId.S },
            },
          })
        )
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Cart cleared for user: ${userId}`,
        deletedCount: queryResult.Items.length,
      }),
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to clear cart",
        error: error.message,
      }),
    };
  }
};
