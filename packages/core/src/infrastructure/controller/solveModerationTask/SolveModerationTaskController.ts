import { TasksApi } from '../../api/tasks/TasksApi';
import { aiDevsTasksApi } from '../../api/tasks';
import { AiChatApi, Prompt } from '../../api/aiChat/AiChatApi';

export interface SolveModerationTaskDependencies {
  tasksApi: TasksApi;
  aiChatApi: AiChatApi;
}

export interface SolveModerationTaskResponse {
  content:
    | 'Answer correct! 🎉🎉🎉'
    | 'Answer incorrect. ⛔ Time to bug hunting. 🪲';
}

export class SolveModerationTaskController {
  public constructor(private dependencies: SolveModerationTaskDependencies) {}

  public async execute(): Promise<SolveModerationTaskResponse> {
    const { tasksApi, aiChatApi } = this.dependencies;
    const taskName = 'moderation';

    const taskToken = await tasksApi.fetchTaskToken(taskName);

    type ModerationTaskData = [string, string, string, string];
    const moderationTaskData = await tasksApi.getTaskData<ModerationTaskData>(
      taskToken
    );

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

    const taskAnswer = await aiDevsTasksApi.sendAnswer(
      moderationTaskAiChatResult,
      taskToken
    );

    if (taskAnswer.isCorrect) {
      return {
        content: `Answer correct! 🎉🎉🎉`,
      };
    }

    return {
      content: `Answer incorrect. ⛔ Time to bug hunting. 🪲`,
    };
  }
}
