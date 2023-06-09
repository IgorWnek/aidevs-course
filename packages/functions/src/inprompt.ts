import { ApiHandler } from 'sst/node/api';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import 'dotenv/config';
import { solveInpromptTaskController } from '@aidevs-course/core/infrastructure/controller/solveInpromptTask';

export const handler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const response = await solveInpromptTaskController.solveInpromptTask();

  return {
    body: response.content,
  };
});
