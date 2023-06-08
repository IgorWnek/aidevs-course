import { SolveModerationTaskController } from './SolveModerationTaskController';
import { aiDevsTasksApi } from '../../api/tasks';
import { openAiChatApi } from '../../api/aiChat';

const solveModerationTaskController = new SolveModerationTaskController({
  tasksApi: aiDevsTasksApi,
  aiChatApi: openAiChatApi,
});

export { solveModerationTaskController };
