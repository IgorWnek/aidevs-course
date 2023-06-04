import { ApiHandler } from "sst/node/api";
import { Time } from "@aidevs-course/core/time";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import "dotenv/config";
import fetch, { RequestInit } from "node-fetch";
import { Configuration, OpenAIApi } from "openai";
import { ChatCompletionRequestMessage } from "openai/api";

export const handler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const aiDevsApiKey = process.env.AI_DEVS_API_KEY;
  const aiDevsTasksUrl = "https://zadania.aidevs.pl";
  const taskName = "moderation";
  const aiDevsTaskTokenEndpointUrl = `${aiDevsTasksUrl}/token/${taskName}`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apikey: aiDevsApiKey,
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  type ModerationTask = {
    code: number;
    msg: string;
    input: [string, string, string, string];
  };

  const taskResponse = await fetch(aiDevsTaskEndpointUrl, taskEndpointOptions);
  const moderationTask = (await taskResponse.json()) as ModerationTask;

  // Business Logic
  const openaiConfiguration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
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
    role: "user",
    content: prompt,
  };
  const completionResponse = await openai.createChatCompletion({
    messages: [message],
    model: "gpt-4",
  });

  const chatResponseContent =
    completionResponse.data.choices[0].message?.content;
  let moderationPhrases = [] as number[];

  if (chatResponseContent) {
    moderationPhrases = JSON.parse(chatResponseContent) as number[];
  }

  // Verify answer
  const answerEndpointUrl = `${aiDevsTasksUrl}/answer/${taskToken.token}`;
  const answerRequestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: moderationPhrases,
    }),
  };

  const answerResponse = await fetch(answerEndpointUrl, answerRequestOptions);

  if (answerResponse.ok) {
    return {
      body: `Answer correct! 🎉🎉🎉`,
    };
  }

  return {
    body: `Answer incorrect. ⛔ Time to bug hunting. 🪲`,
  };
});
