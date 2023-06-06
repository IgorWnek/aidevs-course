import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';
import { OpenAiConfig } from '../../../../config/openAi/OpenAiConfig';
import { TasksApi } from '../../api/tasks/TasksApi';
import { aiDevsTasksApi } from '../../api/tasks';

export interface SolveModerationTaskDependencies {
  tasksApi: TasksApi;
  openAiConfig: OpenAiConfig;
}

export interface SolveModerationTaskResponse {
  content:
    | 'Answer correct! 🎉🎉🎉'
    | 'Answer incorrect. ⛔ Time to bug hunting. 🪲';
}

export class SolveModerationTaskController {
  public constructor(private dependencies: SolveModerationTaskDependencies) {}

  public async execute(): Promise<SolveModerationTaskResponse> {
    const { tasksApi, openAiConfig } = this.dependencies;
    const taskName = 'moderation';

    const taskToken = await tasksApi.fetchTaskToken(taskName);

    type ModerationTaskData = [string, string, string, string];
    const moderationTaskData = await tasksApi.getTaskData<ModerationTaskData>(
      taskToken
    );

    // Business Logic
    const openaiConfiguration = new Configuration({
      organization: openAiConfig.organization,
      apiKey: openAiConfig.apiKey,
    });
    const openai = new OpenAIApi(openaiConfiguration);
    const prompt = `
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

    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: prompt,
    };
    const completionResponse = await openai.createChatCompletion({
      messages: [message],
      model: 'gpt-4',
    });

    const chatResponseContent =
      completionResponse.data.choices[0].message?.content;
    let moderationPhrases = [] as number[];

    if (chatResponseContent !== undefined) {
      moderationPhrases = JSON.parse(chatResponseContent) as number[];
    }

    const taskAnswer = await aiDevsTasksApi.sendAnswer(
      moderationPhrases,
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
