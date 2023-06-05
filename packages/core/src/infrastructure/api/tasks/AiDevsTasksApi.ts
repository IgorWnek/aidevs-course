import { AiDevsConfig } from '../../../../config/aiDevs/AiDevsConfig';
import fetch, { RequestInit } from 'node-fetch';

export interface AiDevsTasksApiDependencies {
  aiDevsConfig: AiDevsConfig;
}

interface AiDevsTaskTokenResponse {
  code: number;
  msg: string;
  token: string;
}

export class AiDevsTasksApi implements TasksApi {
  private tasksUrl = 'https://zadania.aidevs.pl';

  public constructor(private dependencies: AiDevsTasksApiDependencies) {}

  async fetchTaskToken(taskName: string): Promise<TaskToken> {
    const { aiDevsConfig } = this.dependencies;
    const tokenPath = '/token';
    const taskTokenEndpointUrl = `${this.tasksUrl}${tokenPath}/${taskName}`;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: aiDevsConfig.apiKey,
      }),
    };

    const taskTokenResponse = await fetch(taskTokenEndpointUrl, requestOptions);
    const taskToken =
      (await taskTokenResponse.json()) as AiDevsTaskTokenResponse;
    // TODO Add errors handling

    return {
      value: taskToken.token,
    };
  }
}
