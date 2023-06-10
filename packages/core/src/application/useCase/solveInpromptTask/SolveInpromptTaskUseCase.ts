import { SolveTaskUseCase, TaskResult } from '../SolveTaskUseCase';
import { TasksApi } from '../../../infrastructure/api/tasks/TasksApi';
import {
  AiChatApi,
  Prompt,
} from '../../../infrastructure/api/aiChat/AiChatApi';
import { Logger } from '../../../infrastructure/log/Logger';

export interface SolveInpromptTaskUseCaseDependencies {
  tasksApi: TasksApi;
  aiChatApi: AiChatApi;
  logger: Logger;
}

export class SolveInpromptTaskUseCase implements SolveTaskUseCase {
  public constructor(
    private dependencies: SolveInpromptTaskUseCaseDependencies
  ) {}
  public async execute(): Promise<TaskResult> {
    const { tasksApi, aiChatApi, logger } = this.dependencies;

    const taskName = 'inprompt';
    const taskToken = await tasksApi.fetchTaskToken(taskName);
    logger.info('Gathered task token');

    const taskData = await tasksApi.getTaskData<unknown>(taskToken);
    logger.info(`Task data: ${JSON.stringify(taskData)}`);

    if (!taskData.question) {
      throw new Error('Inprompt task data must have a question.');
    }

    const promptAboutName: Prompt = {
      content: this.getPromptAboutName(taskData.question),
    };
    logger.info(promptAboutName.content);
    const characterName = await aiChatApi.getSingleChatResponse<string>(
      promptAboutName
    );
    logger.info(characterName);

    return {
      answeredCorrect: false,
    };
  }

  private getPromptAboutName(question: string): string {
    return `
Zachowuj się jak analizator tekstów i filolog.

Analizuję pewne pytania, z których potrzebuję uzyskać jedynie imię postaci, której dotyczy to pytanie. W odpowiedzi, zwróć tylko i wyłącznie imię osoby, której to pytanie dotyczy.

### Pytanie do analizy
${question}
    `;
  }
}
