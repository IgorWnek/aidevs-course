import { AiDevsConfig } from '../../../../config/aiDevs/AiDevsConfig';
import fetch, { RequestInit } from 'node-fetch';
import { TasksApi, TaskToken } from './TasksApi';

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

  async getTaskData<TaskData>(taskToken: TaskToken): Promise<TaskData> {
    const taskPath = '/task';
    const taskEndpointUrl = `${this.tasksUrl}${taskPath}/${taskToken.value}`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    interface TaskResponse {
      code: number;
      msg: string;
      input: TaskData;
    }

    const taskResponse = await fetch(taskEndpointUrl, requestOptions);
    const task = (await taskResponse.json()) as TaskResponse;

    return task.input;
  }
}
