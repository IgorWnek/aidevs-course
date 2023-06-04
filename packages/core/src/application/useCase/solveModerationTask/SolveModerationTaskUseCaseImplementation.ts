import {
  SolveModerationTaskUseCase,
  TaskResult,
} from './SolveModerationTaskUseCase';

export class SolveModerationTaskUseCaseImplementation
  implements SolveModerationTaskUseCase
{
  async execute(): Promise<TaskResult> {
    const taskResult: TaskResult = {
      answeredCorrect: false,
    };

    return Promise.resolve(taskResult);
  }
}
