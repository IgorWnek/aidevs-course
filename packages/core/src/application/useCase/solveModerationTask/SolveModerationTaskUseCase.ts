export interface TaskResult {
  answeredCorrect: boolean;
}

export interface SolveModerationTaskUseCase {
  execute(): Promise<TaskResult>;
}
