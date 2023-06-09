import { SolveTaskUseCase } from '../../../application/useCase/SolveTaskUseCase';

export interface SolveModerationTaskDependencies {
  solveModerationTaskUseCase: SolveTaskUseCase;
}

export interface SolveModerationTaskResponse {
  content:
    | 'Answer correct! 🎉🎉🎉'
    | 'Answer incorrect. ⛔ Time to bug hunting. 🪲';
}

export class SolveModerationTaskController {
  public constructor(private dependencies: SolveModerationTaskDependencies) {}

  public async execute(): Promise<SolveModerationTaskResponse> {
    const { solveModerationTaskUseCase } = this.dependencies;

    const taskResult = await solveModerationTaskUseCase.execute();

    if (taskResult.answeredCorrect) {
      return {
        content: `Answer correct! 🎉🎉🎉`,
      };
    }

    return {
      content: `Answer incorrect. ⛔ Time to bug hunting. 🪲`,
    };
  }
}
