import { SolveTaskUseCase, TaskResult } from './SolveTaskUseCase';

export class SolveModerationTaskUseCase implements SolveTaskUseCase {
  async execute(): Promise<TaskResult> {
    const taskResult: TaskResult = {
      answeredCorrect: false,
    };

    return Promise.resolve(taskResult);
  }
}
