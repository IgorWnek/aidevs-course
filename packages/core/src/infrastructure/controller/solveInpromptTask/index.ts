import { SolveInpromptTaskController } from './SolveInpromptTaskController';
import { winstonLogger } from '../../log';

const solveInpromptTaskController = new SolveInpromptTaskController({
  solveInpromptTaskUseCase: 'sometask',
  logger: winstonLogger,
});

export { solveInpromptTaskController };
