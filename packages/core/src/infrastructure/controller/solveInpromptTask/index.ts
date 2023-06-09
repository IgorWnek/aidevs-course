import { SolveInpromptTaskController } from './SolveInpromptTaskController';
import { winstonLogger } from '../../log';
import { solveInpromptTaskUseCase } from '../../../application/useCase/solveInpromptTask';

const solveInpromptTaskController = new SolveInpromptTaskController({
  solveInpromptTaskUseCase: solveInpromptTaskUseCase,
  logger: winstonLogger,
});

export { solveInpromptTaskController };
