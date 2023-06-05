import { ApiHandler } from 'sst/node/api';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import 'dotenv/config';
import { solveModerationTaskController } from '@aidevs-course/core/infrastructure/controller/solveModerationTask';

export const handler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const response = await solveModerationTaskController.execute();

  return {
    body: response.content,
  };
});
