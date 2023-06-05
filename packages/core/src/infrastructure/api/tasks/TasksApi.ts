interface TaskToken {
  value: string;
}
interface TasksApi {
  fetchTaskToken(taskName: string): Promise<TaskToken>;
}
