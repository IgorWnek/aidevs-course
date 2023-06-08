import { SolveTaskUseCase, TaskResult } from './SolveTaskUseCase';
import { TasksApi } from '../../../infrastructure/api/tasks/TasksApi';
import {
  AiChatApi,
  Prompt,
} from '../../../infrastructure/api/aiChat/AiChatApi';
import { Logger } from '../../../infrastructure/log/Logger';
import { aiDevsTasksApi } from '../../../infrastructure/api/tasks';

export interface SolveModerationTaskUseCaseDependencies {
  tasksApi: TasksApi;
  aiChatApi: AiChatApi;
  logger: Logger;
}

export class SolveModerationTaskUseCase implements SolveTaskUseCase {
  public constructor(
    private dependencies: SolveModerationTaskUseCaseDependencies
  ) {}

  async execute(): Promise<TaskResult> {
    const { tasksApi, aiChatApi, logger } = this.dependencies;

    const taskName = 'moderation';
    logger.info(`Started ${taskName} task.`);

    const taskToken = await tasksApi.fetchTaskToken(taskName);
    logger.info('Gathered task token.');

    type ModerationTaskData = [string, string, string, string];
    const moderationTaskData = await tasksApi.getTaskData<ModerationTaskData>(
      taskToken
    );
    logger.info(`Moderation task data:\n${moderationTaskData.toString()}`);

    const promptContent = `
Zachowuj się jak doświadczony moderator treści, który rygorystycznie rozpoznaje czy dana treść powinna być moderowana czy nie. Twoje odpowiedzi powinny zawierać tylko i wyłącznie tablicę sformatowaną zgodnie z instrukcjami w Kontekście.

### Kontekst

Otrzymasz tablicę z pewnymi zdaniami lub wyrażeniami.
Twoim zadaniem jest sklasyfikowanie każdego zadania czy powinno być moderowane czy nie.
Klasyfikacji dokonujesz przez podanie "1" jeżeli treść musi być zmoderowana lub "0" jeżeli nie.

Przykładowe zdania:
['lubię placki z dżemem', 'piękne kotki piją mleczko', 'Trzeba zbić to dziecko!', 'ale piękne niebo']

Przykładowa odpowiedź:
[0,0,1,0]

### Zadanie
${JSON.stringify(moderationTaskData)}
  `;

    const prompt: Prompt = {
      content: promptContent,
    };
    const moderationTaskAiChatResult =
      await aiChatApi.sendModerationTaskMessage(prompt);
    logger.info(
      `Moderation task chat result: ${moderationTaskAiChatResult.toString()}`
    );

    const taskAnswer = await aiDevsTasksApi.sendAnswer(
      moderationTaskAiChatResult,
      taskToken
    );

    const taskResult: TaskResult = {
      answeredCorrect: false,
    };

    if (taskAnswer.isCorrect) {
      taskResult.answeredCorrect = true;
    }

    return taskResult;
  }
}
