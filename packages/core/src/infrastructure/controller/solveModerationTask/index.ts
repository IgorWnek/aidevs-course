import { SolveModerationTaskController } from './SolveModerationTaskController';
import { aiDevsConfig } from '../../../../config/aiDevs';

const solveModerationTaskController = new SolveModerationTaskController({
  aiDevsConfig,
});

export { solveModerationTaskController };
