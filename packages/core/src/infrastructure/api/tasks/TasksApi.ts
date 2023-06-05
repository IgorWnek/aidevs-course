export interface TaskToken {
  value: string;
}
export interface TasksApi {
  fetchTaskToken(taskName: string): Promise<TaskToken>;
  getTaskData<TaskData>(taskToken: TaskToken): Promise<TaskData>;
}
