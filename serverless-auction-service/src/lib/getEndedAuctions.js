import AWS from 'aws-sdk';

const dynmodb = new AWS.DynamoDB.DocumentClient();

export async function getEndedAuctions() {
  const now = new Date();

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    // beacuse status is a reserves word we need the changes it so in run time the word #status will be changed to status
    keyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynmodb.query(params).promise();
  return result.Items;
}
