export interface TaskToken {
  value: string;
}

export interface TaskAnswer {
  isCorrect: boolean;
}

export interface TaskResponse<TaskResponseData> {
  code: number;
  msg: string;
  input: TaskResponseData;
  question?: string;
}

export interface TasksApi {
  fetchTaskToken(taskName: string): Promise<TaskToken>;
  getTaskData<TaskData>(taskToken: TaskToken): Promise<TaskResponse<TaskData>>;
  sendAnswer<AnswerData>(
    answerData: AnswerData,
    taskToken: TaskToken
  ): Promise<TaskAnswer>;
}
