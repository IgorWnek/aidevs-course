import { SolveModerationTaskController } from './SolveModerationTaskController';
import { aiDevsConfig } from '../../../../config/aiDevs';
import { openAiConfig } from '../../../../config/openAi';

const solveModerationTaskController = new SolveModerationTaskController({
  aiDevsConfig,
  openAiConfig,
});

export { solveModerationTaskController };
