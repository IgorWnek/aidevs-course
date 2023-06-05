import { SolveModerationTaskController } from './SolveModerationTaskController';
import { openAiConfig } from '../../../../config/openAi';
import { aiDevsTasksApi } from '../../api/tasks';

const solveModerationTaskController = new SolveModerationTaskController({
  tasksApi: aiDevsTasksApi,
  openAiConfig,
});

export { solveModerationTaskController };
