export interface TaskToken {
  value: string;
}

export interface TaskAnswer {
  isCorrect: boolean;
}

export interface TasksApi {
  fetchTaskToken(taskName: string): Promise<TaskToken>;
  getTaskData<TaskData>(taskToken: TaskToken): Promise<TaskData>;
  sendAnswer<AnswerData>(
    answerData: AnswerData,
    taskToken: TaskToken
  ): Promise<TaskAnswer>;
}
