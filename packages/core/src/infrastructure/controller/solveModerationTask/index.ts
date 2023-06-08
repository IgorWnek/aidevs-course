import { SolveModerationTaskController } from './SolveModerationTaskController';
import { solveModerationTaskUseCase } from '../../../application/useCase/solveModerationTask';

const solveModerationTaskController = new SolveModerationTaskController({
  solveModerationTaskUseCase: solveModerationTaskUseCase,
});

export { solveModerationTaskController };
