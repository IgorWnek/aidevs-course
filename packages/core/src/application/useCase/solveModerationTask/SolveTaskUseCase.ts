export interface TaskResult {
  answeredCorrect: boolean;
}

export interface SolveTaskUseCase {
  execute(): Promise<TaskResult>;
}
