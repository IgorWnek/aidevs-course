import { SolveModerationTaskUseCase } from './SolveModerationTaskUseCase';
import { aiDevsTasksApi } from '../../../infrastructure/api/tasks';
import { openAiChatApi } from '../../../infrastructure/api/aiChat';
import { winstonLogger } from '../../../infrastructure/log';

const solveModerationTaskUseCase = new SolveModerationTaskUseCase({
  tasksApi: aiDevsTasksApi,
  aiChatApi: openAiChatApi,
  logger: winstonLogger,
});

export { solveModerationTaskUseCase };
