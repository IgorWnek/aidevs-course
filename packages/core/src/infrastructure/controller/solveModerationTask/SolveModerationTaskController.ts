import { AiDevsConfig } from '../../../../config/aiDevs/AiDevsConfig';
import fetch, { RequestInit } from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';
import { OpenAiConfig } from '../../../../config/openAi/OpenAiConfig';

export interface SolveModerationTaskDependencies {
  aiDevsConfig: AiDevsConfig;
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
    const { aiDevsConfig, openAiConfig } = this.dependencies;

    const aiDevsTasksUrl = 'https://zadania.aidevs.pl';
    const taskName = 'moderation';
    const aiDevsTaskTokenEndpointUrl = `${aiDevsTasksUrl}/token/${taskName}`;

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: aiDevsConfig.apiKey,
      }),
    };

    type TaskToken = {
      code: number;
      msg: string;
      token: string;
    };

    const taskTokenResponse = await fetch(aiDevsTaskTokenEndpointUrl, options);
    const taskToken = (await taskTokenResponse.json()) as TaskToken;

    const aiDevsTaskEndpointUrl = `${aiDevsTasksUrl}/task/${taskToken.token}`;
    const taskEndpointOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    type ModerationTask = {
      code: number;
      msg: string;
      input: [string, string, string, string];
    };

    const taskResponse = await fetch(
      aiDevsTaskEndpointUrl,
      taskEndpointOptions
    );
    const moderationTask = (await taskResponse.json()) as ModerationTask;

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
${JSON.stringify(moderationTask.input)}
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

    // Verify answer
    const answerEndpointUrl = `${aiDevsTasksUrl}/answer/${taskToken.token}`;
    const answerRequestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: moderationPhrases,
      }),
    };

    const answerResponse = await fetch(answerEndpointUrl, answerRequestOptions);

    if (answerResponse.ok) {
      return {
        content: `Answer correct! 🎉🎉🎉`,
      };
    }

    return {
      content: `Answer incorrect. ⛔ Time to bug hunting. 🪲`,
    };
  }
}
