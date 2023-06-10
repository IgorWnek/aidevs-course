import { SolveInpromptTaskUseCase } from './SolveInpromptTaskUseCase';
import { aiDevsTasksApi } from '../../../infrastructure/api/tasks';
import { openAiChatApi } from '../../../infrastructure/api/aiChat';
import { winstonLogger } from '../../../infrastructure/log';
import { basicTextSearchService } from '../../../domain/textSearch';

const solveInpromptTaskUseCase = new SolveInpromptTaskUseCase({
  tasksApi: aiDevsTasksApi,
  aiChatApi: openAiChatApi,
  textSearchService: basicTextSearchService,
  logger: winstonLogger,
});

export { solveInpromptTaskUseCase };
