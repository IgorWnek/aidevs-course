import { SolveModerationTaskController } from './SolveModerationTaskController';
import { aiDevsTasksApi } from '../../api/tasks';
import { openAiChatApi } from '../../api/aiChat';
import { winstonLogger } from '../../log';

const solveModerationTaskController = new SolveModerationTaskController({
  tasksApi: aiDevsTasksApi,
  aiChatApi: openAiChatApi,
  logger: winstonLogger,
});

export { solveModerationTaskController };
