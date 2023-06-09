import { SolveInpromptTaskUseCase } from './SolveInpromptTaskUseCase';
import { aiDevsTasksApi } from '../../../infrastructure/api/tasks';
import { openAiChatApi } from '../../../infrastructure/api/aiChat';
import { winstonLogger } from '../../../infrastructure/log';

const solveInpromptTaskUseCase = new SolveInpromptTaskUseCase({
  tasksApi: aiDevsTasksApi,
  aiChatApi: openAiChatApi,
  logger: winstonLogger,
});

export { solveInpromptTaskUseCase };
