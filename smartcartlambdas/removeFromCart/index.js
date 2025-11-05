import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-2" });
const TABLE_NAME = "SmartCart_Carts";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userId, productId } = body;

    if (!userId || !productId)
      return { statusCode: 400, body: JSON.stringify({ message: "Missing userId or productId" }) };

    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        productId: { S: productId },
      },
    });

    await client.send(command);
    return { statusCode: 200, body: JSON.stringify({ success: true, message: "Item removed" }) };
  } catch (err) {
    console.error("Error removing item:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
