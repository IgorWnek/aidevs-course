import { SolveTaskUseCase, TaskResult } from '../SolveTaskUseCase';
import { TasksApi } from '../../../infrastructure/api/tasks/TasksApi';
import { AiChatApi } from '../../../infrastructure/api/aiChat/AiChatApi';
import { Logger } from '../../../infrastructure/log/Logger';

export interface SolveInpromptTaskUseCaseDependencies {
  tasksApi: TasksApi;
  aiChatApi: AiChatApi;
  logger: Logger;
}

export class SolveInpromptTaskUseCase implements SolveTaskUseCase {
  public constructor(
    private dependencies: SolveInpromptTaskUseCaseDependencies
  ) {}
  public async execute(): Promise<TaskResult> {
    const { tasksApi, aiChatApi, logger } = this.dependencies;

    const taskName = 'inprompt';
    const taskToken = await tasksApi.fetchTaskToken(taskName);
    logger.info('Gathered task token');

    const taskData = await tasksApi.getTaskData<unknown>(taskToken);
    logger.info(`Task data: ${JSON.stringify(taskData)}`);

    return {
      answeredCorrect: false,
    };
  }
}
