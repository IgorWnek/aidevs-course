import { Logger } from '../../log/Logger';
import { SolveTaskUseCase } from '../../../application/useCase/SolveTaskUseCase';

export interface SolveInpromptTaskControllerDependencies {
  solveInpromptTaskUseCase: SolveTaskUseCase;
  logger: Logger;
}

export interface SolveInpromptTaskResult {
  content: 'Correct!' | 'Incorrect...';
}

export class SolveInpromptTaskController {
  public constructor(
    private dependencies: SolveInpromptTaskControllerDependencies
  ) {}

  public async solveInpromptTask(): Promise<SolveInpromptTaskResult> {
    const { solveInpromptTaskUseCase, logger } = this.dependencies;
    logger.info(`Solving "inprompt" task`);

    const taskResult = await solveInpromptTaskUseCase.execute();

    const result: SolveInpromptTaskResult = {
      content: 'Incorrect...',
    };

    if (taskResult.answeredCorrect) {
      result.content = 'Correct!';
    }

    return result;
  }
}
