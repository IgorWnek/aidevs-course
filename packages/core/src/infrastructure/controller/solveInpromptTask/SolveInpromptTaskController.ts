import { Logger } from '../../log/Logger';

export interface SolveInpromptTaskControllerDependencies {
  solveInpromptTaskUseCase: string;
  logger: Logger;
}

export interface SolveInpromptTaskResponse {
  content: 'Correct!' | 'Incorrect...';
}

export class SolveInpromptTaskController {
  public constructor(
    private dependencies: SolveInpromptTaskControllerDependencies
  ) {}

  public async solveInpromptTask(): Promise<SolveInpromptTaskResponse> {
    const { logger } = this.dependencies;
    logger.info(`Solving "inprompt" task`);

    return {
      content: 'Incorrect...',
    };
  }
}
