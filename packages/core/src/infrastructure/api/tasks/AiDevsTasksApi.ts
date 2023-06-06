import { AiDevsConfig } from '../../../../config/aiDevs/AiDevsConfig';
import fetch, { RequestInit } from 'node-fetch';
import { TaskAnswer, TasksApi, TaskToken } from './TasksApi';

export interface AiDevsTasksApiDependencies {
  aiDevsConfig: AiDevsConfig;
}

interface AiDevsTaskTokenResponse {
  code: number;
  msg: string;
  token: string;
}
interface TaskResponse<TaskResponseData> {
  code: number;
  msg: string;
  input: TaskResponseData;
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

    const taskResponse = await fetch(taskEndpointUrl, requestOptions);
    const task = (await taskResponse.json()) as TaskResponse<TaskData>;

    return task.input;
  }

  async sendAnswer<AnswerData>(
    answerData: AnswerData,
    taskToken: TaskToken
  ): Promise<TaskAnswer> {
    const answerPath = '/answer';
    const answerEndpointUrl = `${this.tasksUrl}${answerPath}/${taskToken.value}`;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: answerData,
      }),
    };

    const answerResponse = await fetch(answerEndpointUrl, requestOptions);

    const answer: TaskAnswer = {
      isCorrect: false,
    };

    if (answerResponse.ok) {
      answer.isCorrect = true;
    }

    return answer;
  }
}
